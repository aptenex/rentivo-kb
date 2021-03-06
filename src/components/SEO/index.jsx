import React, { Component } from 'react';
import Helmet from 'react-helmet';
import config from '../../../data/SiteConfig';

class SEO extends Component {
  static capitalizeFirstLetter(str) {
    str = str.split(' ');
    for (let i = 0, x = str.length; i < x; i++) {
      str[i] = str[i][0].toUpperCase() + str[i].substr(1);
    }

    return str.join(' ');
  }

  render() {
    const { postNode, postType } = this.props;
    const image = config.ogImage;
    const sitePath = config.siteUrl + config.pathPrefix;

    // These will be set differently for a doc or page
    let title;
    let permalink;
    let description = false;

    if(postNode?.seoTitle){
      title = postNode.seoTitle;
      description = postNode.seoDescription;

    } else if (postType === 'docs-category') {
      const category = postNode.pageContext.parentPageName;

      title = SEO.capitalizeFirstLetter(`${category.replace('-', ' ')}`);

    }  else if(postType ==='docs-glossary'){
      permalink = sitePath + '/glossary/' + postNode.slug;
      ({ title } = this.props);
      ({ description } = this.props);
    } else if(postNode.location) {
      permalink = sitePath + postNode.location.pathname;
      ( title  = this.props.title ? this.props.title : this.props.name);
      ({ description } = this.props);

    } else if(postNode.title || postNode.name){
      ( title = postNode.title || postNode.name);
      ({ description } = postNode.summary | '');
    }

    const schemaOrgJSONLD = [
      {
        '@context': 'http://schema.org',
        '@type': 'WebSite',
        url: sitePath,
        name: config.siteTitle,
        alternateName: config.siteTitleAlt ? config.siteTitleAlt : '',
      },
      {
        '@context': 'http://schema.org',
        '@type': 'WebPage',
        url: permalink,
        name: title,
        alternateName: config.siteTitleAlt ? config.siteTitleAlt : '',
        headline: title,
        image: {
          '@type': 'ImageObject',
          url: image,
        },
        description,
      },
    ];

    return (
      <Helmet>
        <title>{`${title}`}</title>
        {/* General tags */}
        <meta name="description" content={description} />
        <meta name="image" content={image} />

        {/* Schema.org tags */}
        <script type="application/ld+json">
          {JSON.stringify(schemaOrgJSONLD)}
        </script>

        {/* OpenGraph tags */}
        <meta property="og:url" content={permalink} />
        {postType === 'doc' ? <meta property="og:type" content="article" /> : null}
        <meta property="og:title" content={title} />
        {description ? <meta property="og:description" content={description} /> : null}
        <meta property="og:image" content={image} />

        {/* Twitter Card tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:creator"
          content={config.userTwitter ? config.userTwitter : ''}
        />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={image} />
      </Helmet>
    );
  }
}

export default SEO;
