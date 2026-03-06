import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: ['/dashboard/', '/conversations/', '/agents/', '/analytics/', '/integrations/', '/settings/'],
        },
        // We assume the application will be hosted on a custom domain, but for development we use localhost.
        // In production this should be an environment variable.
        sitemap: 'https://agentpulse.ai/sitemap.xml',
    }
}
