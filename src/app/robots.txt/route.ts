import { NextResponse } from 'next/server'

export async function GET() {
    const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'https://redlightjapan.com'

    const robotsTxt = `
# *
User-agent: *
Allow: /
Disallow: /admin/*
Disallow: /api/*
Disallow: /_next/*
Disallow: /static/*
Disallow: /private/*
Disallow: /dashboard/*

# GPTBot
User-agent: GPTBot
Disallow: /

# ChatGPT-User
User-agent: ChatGPT-User
Disallow: /

# Google-Extended
User-agent: Google-Extended
Disallow: /

# CCBot
User-agent: CCBot
Disallow: /

# anthropic-ai
User-agent: anthropic-ai
Disallow: /

# Host
Host: ${baseUrl}

# Sitemaps
Sitemap: ${baseUrl}/sitemap.xml
`.trim()

    return new NextResponse(robotsTxt, {
        headers: {
            'Content-Type': 'text/plain',
        },
    })
} 