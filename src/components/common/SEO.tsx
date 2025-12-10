import { Helmet } from 'react-helmet-async';
import logo from '../../assets/og_logo.png';

interface SEOProps {
    title?: string;
    description?: string;
    image?: string;
    url?: string;
    keywords?: string;
}

const SEO = ({ title, description, image, url, keywords }: SEOProps) => {
    const defaultTitle = 'AYNO - AI활용 과정을 공유하세요';
    const defaultDescription = 'AI 활용 노하우를 공유하고, 다른 사람들의 워크플로우를 탐색해보세요. AYNO에서 당신의 AI 경험을 확장하세요.';
    const defaultUrl = 'https://ayno.co.kr';
    const defaultImage = `${defaultUrl}${logo}`;
    const defaultKeywords = 'AI, 인공지능, 워크플로우, 프롬프트, ChatGPT, Midjourney, AI활용, 노하우 공유';

    const finalTitle = title ? `${title} | AYNO` : defaultTitle;
    const finalDescription = description || defaultDescription;
    const finalImage = image || defaultImage;
    const finalUrl = url || defaultUrl;
    const finalKeywords = keywords || defaultKeywords;

    return (
        <Helmet>
            {/* Standard Metadata */}
            <title>{finalTitle}</title>
            <meta name="description" content={finalDescription} />
            <meta name="keywords" content={finalKeywords} />
            <link rel="canonical" href={finalUrl} />

            {/* Open Graph / Facebook / Instagram */}
            <meta property="og:type" content="website" />
            <meta property="og:url" content={finalUrl} />
            <meta property="og:title" content={finalTitle} />
            <meta property="og:description" content={finalDescription} />
            <meta property="og:image" content={finalImage} />
            <meta property="og:image:width" content="160" />
            <meta property="og:image:height" content="43" />
            <meta property="og:image:type" content="image/png" />
            <meta property="og:site_name" content="AYNO" />
            <meta property="og:locale" content="ko_KR" />

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:url" content={finalUrl} />
            <meta name="twitter:title" content={finalTitle} />
            <meta name="twitter:description" content={finalDescription} />
            <meta name="twitter:image" content={finalImage} />

            {/* Robots */}
            <meta name="robots" content="index, follow" />
        </Helmet>
    );
};

export default SEO;
