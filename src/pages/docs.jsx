import React from 'react';
import { Link } from 'gatsby';
import SEO from '../components/SEO';
import Search from '../components/Search';
import { GLOSSARY_TERMS_HOME } from '../constants/glossaryTerms';
import GlossaryPartial from '../components/GlossaryPartial/glossaryPartial';
import FooterCallout from '../components/FooterCallout';
import config from '../../data/SiteConfig';
import HOME_CARDS from '../constants/homeCards';
import CALLOUTS from '../constants/homeCallouts';
import Layout from '../components/DocsLayout';
import './docs.scss';
import MarketingLayout from "../components/MarketingLayout";
class Docs extends React.Component {
  static renderCards() {
    return HOME_CARDS.map(card => (
      <div className="card card--home col-md-6 ta-center" key={card.TITLE}>
        <div className="card__inner">
          <img className="card-icon" src={card.ICON} alt={card.TITLE} />
          <h3 className="card__title">{card.TITLE}</h3>
          {card.LINKS.map(link => <Link key={link.TEXTNODE} to={link.URL} className="card__link">{link.TEXTNODE}</Link>)}
        </div>
        <div className="card__button">
          <Link className="btn center" to={card.BUTTON_LINK}>View All</Link>
        </div>
      </div>
    ));
  }

  static renderCallouts() {
    return CALLOUTS.map((card) => {
      const cardClass = `card col-home-callout home-callout callout--${card.BADGE}`;
      return (
        <div className={cardClass} key={card.TITLE}>
          <div className="home-callout__badge">
            {card.BADGE}
          </div>
          <h3 className="card__title is-size-h2 m-bottom-2">
            {card.TITLE}
            {(card.TAG.length > 0 ? (<span className="tag--beta">{card.TAG}</span>) : null)}
          </h3>
          <div className="is-p">{card.COPY}</div>
          <Link to={card.LINK} className="btn btn-primary center">Get Started</Link>
        </div>
      );
    });
  }

  render() {
    const { location } = this.props;
    return (
      <Layout location={location} subNav={false}>
        <div className="docs-home">
          <SEO postNode={this.props} title={config.siteTitle} description="Rentivo Documentation Home" />
          <div className="search-hero ta-center color-white">
            <div className="container">
              <div className="search-hero__bg">
                <h1 className="page-title">Rentivo Knowledge Center</h1>
                <Search />
              </div>
            </div>
          </div>
          <div className="home-callouts">
            <div className="container">
              <div className="row row--home-callouts">
                {Docs.renderCallouts()}
              </div>
            </div>
          </div>
          <div className="main">
            <div className="home-featured">
              <div className="container">
                <h2>Featured Resources</h2>
                <div className="row row--home-cards">
                  {Docs.renderCards()}
                </div>
              </div>
            </div>
            <GlossaryPartial data={GLOSSARY_TERMS_HOME} />
          </div>
          <FooterCallout />
        </div>
      </Layout>
    );
  }
}

export default Docs;
