import React, {Fragment} from 'react';
import { graphql } from 'gatsby';
import RehypeReact from 'rehype-react';
import _ from 'lodash';
import SEO from '../components/SEO';
import './syntax-highlighting.scss';
import './doc.scss';
import MarketingLayout from "../components/MarketingLayout";
import styled from 'styled-components';
import Container from 'common/src/components/UI/Container';
import { Link } from 'gatsby';
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import AsideCategoryMenu from '../containers/Rentivo/AsideCategoryMenu';
import Row from 'components/Flex/Row'
import Col from 'components/Flex/Col'
import ProductIcons from '../containers/Rentivo/ProductIcons';
import ContentSection from '../containers/Rentivo/ContentSection';
import ProductDefinitions from '../containers/Rentivo/ProductIcons/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faChevronLeft } from '@fortawesome/pro-duotone-svg-icons'
import Text from "../reusecore/src/elements/Text";
import Heading from "../reusecore/src/elements/Heading";
import Box from "../reusecore/src/elements/Box";
import {PageContent} from '../utils/renderer';
import FeatuetteSection from "../containers/Rentivo/FeaturetteSection";
import ProductSection from "../containers/Rentivo/FeatureGallery";
import HeroSection from "../containers/Rentivo/HeroSection";
import FaqList from "../containers/Rentivo/FaqSection/List";
import FaqSection from '../containers/Rentivo/FaqSection';
import {themeGet} from "styled-system";
import NavGuide from "containers/Rentivo/NavGuide";
import ContainerWrapper from "common/src/components/UI/Container/style";

const ProductDescriptionSection = styled('div')`
  text-align: left;
`;

const StyledAsideCategoryMenu = styled(AsideCategoryMenu)`

`;

const ReferenceProduct = styled(Link)`
  display: flex;
  background: white;
  border: 1px solid #BBB;
  border-radius: 4px;
  box-shadow: 2px 2px 3px rgba(0,0,0,0.1);
  padding: 10px;
  margin-bottom: 15px;
  p svg {
  margin-right: 10px;
  }
  .iconBlock__wrapper {
    font-size: 3rem;
    opacity: 0.4;
  } 
   transition: border 250ms ease 0s;
      transition: box-shadow 0.3s ease-out 0s, transform 0.2s linear 0s, background-color 0.2s linear 0s;
    &:hover {
      transform: translateY(-2px);
          
    }
  
  
   
`;



class FeatureTemplate extends React.Component {
  getNavigationLinks() {
    const { data : {  feature } } = this.props;
    const links = this.getSortedLinks();
    const foundIndex = _.findIndex( links.map(({node}) => node), { 'id' : feature.id } );

    return {
      previous : foundIndex > 0  ?  links[foundIndex - 1].node : null,
      next : foundIndex >= 0 && foundIndex + 1 < links.length ? links[foundIndex + 1].node : null,
      current : feature
    }
  }

  getSortedLinks(){
    const { data : { sideLinks : { edges : items } } } = this.props;
    const linkDecorated = items.map(({node}) => {
      // We add, so that -50 and 0 and 50... Work when sorting.
      return { node : { ...node, order : parseFloat(`${100000 + (node?.category?.order || 0)}.${ _.replace( node?.order, '-', 0) || 0 }`) } }
    });
    return  _.sortBy( linkDecorated, ['node.order'], ['asc']);

  }

  getCategoryLinks() {
    const links = this.getSortedLinks();
    return _.groupBy( links, ({node}) => {
      return node?.category?.title;
    });
  }

  render() {
    const { data, location, pageContext } = this.props;
    const featureNode = data.feature;


    const { faq : faqGroups}  = data;
    const { previous, next} = this.getNavigationLinks();
    const categoryLinks = this.getCategoryLinks();

    const options = { };

    let productMenuClasses = [];
    if(featureNode.parentPage.heroFeaturette.className){
      productMenuClasses.push(featureNode.parentPage.heroFeaturette.className);
    }
    if(productMenuClasses.length > 0){
      productMenuClasses.push('light');
    }

    return (

    <MarketingLayout product={featureNode.parentPage} menu={productMenuClasses} wrapperClass={`product-` + featureNode.parentPage.slug} location={location} subNav={true}>
          <SEO postNode={featureNode} postType="feature" />

          <Container>
            <Row top="xs">
              <Col xs={12} md={5} xl={3} >

                <ReferenceProduct to={`/${featureNode.parentPage.slug}`} data-slug={featureNode.parentPage.slug}>
                  { ProductDefinitions[featureNode.parentPage.slug] &&
                    <>
                      <ProductIcons type={featureNode.parentPage.slug} />
                      <ProductDescriptionSection >
                        <h4>{ featureNode.parentPage.name }</h4>
                        <Text mb={0} fontSize={'0.9em;'}>
                          <FontAwesomeIcon icon={faChevronLeft}/>
                          Back to Product
                        </Text>
                      </ProductDescriptionSection>
                    </>
                  }
                </ReferenceProduct>

                { Object.keys( categoryLinks).length > 0
                    ? (<StyledAsideCategoryMenu dataSlug={featureNode.parentPage.slug} activeNavSlug={location.pathname} asideCategories={categoryLinks} />)
                    : null
                }
              </Col>
              <Col xs={12} md={7} xl={9} >

                {featureNode?.pageTitle && <Heading as="h1" content={featureNode.pageTitle} /> }
                <NavGuide next={next} previous={previous} />
                <ContentSection><PageContent postNode={featureNode} /></ContentSection>

                { featureNode?.featurettes && featureNode?.featurettes.map( (feature, index) => (
                    (
                        feature.internal.type === 'ContentfulFaq' && feature.items && <FaqList key={index}  showHeaders={false} sectionTitle={{
                          content: feature.question,
                          textAlign: 'center',
                          fontSize: ['20px', '24px'],
                          fontWeight: '400',
                          color: '#0f2137',
                          letterSpacing: '-0.025em',

                          mb: '0',
                        }} data={feature.items} />
                    )
                ))
                }


                <NavGuide next={next} previous={previous} />


              </Col>
            </Row>



          </Container>

      </MarketingLayout>
    );
  }
}

export default FeatureTemplate;
/*   // , sort: {fields: category___order, order: ASC} */
/* eslint no-undef: "off" */
export const pageQuery = graphql`
  query FeatureByID($id: String!, $parentId: String ) {
    sideLinks : allContentfulPage( filter: { type: { eq : "Feature Page"}, parentPage: { id: {  eq : $parentId} }}){
      edges {
        node {
          id
          slug
          name
          order
          internal {
            type
          }
          category {
            id
            title
            order
          }
        }
      }
    }
    feature: contentfulPage(id: {eq: $id}) {
      ...Page
    }
    
  }
  
`;

// fixed(width: 960, background: "rgb:000000") {
// ...GatsbyContentfulFixed_tracedSVG
// }