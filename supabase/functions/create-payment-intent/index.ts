// Supabase Edge Function: create-payment-intent
// Creates a Stripe PaymentIntent for checkout processing
// Called from frontend Checkout.jsx via supabase.functions.invoke()

import Stripe from "https://esm.sh/stripe@14.21.0?target=deno";

// Initialize Stripe with secret key from Edge Function secrets
// Secret is set in Supabase Dashboard > Edge Functions > Secrets
const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY")!, {
    apiVersion: "2024-04-10",
    httpClient: Stripe.createFetchHttpClient(),
});

// CORS headers required for browser requests from localhost/different origins
// x-client-info and apikey are Supabase-specific headers
const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization, x-client-info, apikey",
};

Deno.serve(async (req) => {
    // Browsers send OPTIONS request first to check CORS permissions
    if (req.method === "OPTIONS") {
        return new Response(null, { headers: corsHeaders });
    }

    try {
        // Frontend sends cart total as { amount: 45.99 }
        const { amount } = await req.json();

        // Stripe expects amount in cents (e.g., $45.99 = 4599 cents)
        const paymentIntent = await stripe.paymentIntents.create({
            amount: Math.round(amount * 100),
            currency: "usd",
        });

        // Return clientSecret - frontend uses this to complete payment
        return new Response(
            JSON.stringify({ clientSecret: paymentIntent.client_secret }),
            { headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
    } catch (error) {
        return new Response(
            JSON.stringify({ error: error.message }),
            { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
    }
});