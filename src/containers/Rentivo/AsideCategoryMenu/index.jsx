import React, { Component } from 'react';
import _ from 'lodash';
import styled from 'styled-components';

const CatLink = styled('a')`
  color: #888;
  font-weight: 400;
  display: block;
  font-size: 15px;
  margin-bottom: 12px;
  padding-right: 12px;
  line-height: 1.7;
  &.active {
    color:  #01b47d;
  }
`

const CatHeader = styled('h5')`

  margin-bottom: 15px;
  font-weight: 600;
  font-size: 15px;
  color: #333;
  text-transform: uppercase;
`

const CatGroup = styled('div')`
margin-bottom:30px;
`


class AsideCategoryMenu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeNavItem: props.activeNavSlug,
    };
  }

  render() {
    const navCategories = this.props.asideCategories;
    return (
      <aside className="aside-nav" data-slug={this.props.dataSlug}>
        { Object.entries( navCategories ).map( ([title, links]) => {
              const catLinks = links.map(({node : el}) => {
                const {
                  id,
                  slug,
                  name : textNode,
                } = el;
                let classes = `feature-header ${el.slug}`;
                if (this?.state?.activeNavItem?.includes( `/features/${el.slug}` )) {
                  classes += ' active';
                }

                return <CatLink key={id} className={classes} href={`/features/${_.kebabCase(slug.toLowerCase())}`}>{textNode}</CatLink>;
              });
              return <CatGroup key={title}>{ title !== 'undefined' && <CatHeader>{title}</CatHeader>}{ catLinks }</CatGroup>

            })
        }


      </aside>
    );
  }
}

export default AsideCategoryMenu;
