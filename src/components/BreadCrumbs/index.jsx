import React, { Component } from 'react';
import { Link } from 'gatsby';
import _ from 'lodash';
import {getFullPath} from "constants/pageSlugPrefixes";

class BreadCrumbs extends Component {
  constructor(props) {
    super(props);
    this.pathParts = this.getPathParts();

    this.state = {
      items: this.getSubPaths(),
    };
  }

  getPathParts() {
    const { location } = this.props;
    const { pathname } = location;
    let parts = pathname.split('/');

    parts.includes('glossary') ? parts.splice( 0,1, "docs") : null;
    parts.includes('release-notes') ? parts.splice( 0,1, "docs") : null;

    // We don't want "docs" or "UI" in the breadcrumbs
    // && item !== 'docs'
    return parts.filter(item => item.length );
  }

  getSubPaths() {
    const { location } = this.props;
    const { pathname } = location;
    // No matter what, add and object that represents the docs home
    const home = [
      {
        textNode: 'home',
        to: '/',
      },
    ];

    const allPaths = this.pathParts.map((text) => {
      const path = pathname.substring(0, pathname.indexOf(text)) + text;
      // const to = `${path.replace('/docs', '')}/`;
      const to = path;
      const textNode = text === 'ui' ? 'User Interface' : text.replace(/-/g, ' ');
      return (
        {
          textNode,
          to,
        }
      );
    });

    this.allPaths = allPaths;

    // All paths but current page -- title is added in render method
    const subPaths = [...allPaths.slice(0, allPaths.length - 1)];

    if(this.props.product){

      subPaths.splice(0,0, {
          to  :  getFullPath(this.props.product),
          textNode : this.props.product.name
      });
    }
    console.log(this.props, "Asd");
    // parts.splice(1,0,"Foo");



    // Combine with home object and return.
    return [...home, ...subPaths];
  }

  getTitle() {
    let pageTitle;
    const { data } = this.props;

    if (data && _.has(data[Object.keys(data)], 'fields')) {
      pageTitle = data[Object.keys(data)].fields.title;
    } else {
      pageTitle = this.pathParts.slice(-1)[0].replace(/-/g, ' ');
    }

    // update the last textNode with page title
    this.allPaths[this.allPaths.length - 1].textNode = pageTitle;

    return _.startCase(pageTitle);
  }

  getJSONLD() {
    const json = {
      '@context': 'http://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [],
    };

    const itemList = this.allPaths.map((item, index) => {
      const listItem = {
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@id': item.to,
          name: item.textNode,
        },
      };
      return listItem;
    });

    json.itemListElement = [...itemList];

    return json;
  }

  render() {
    const { items } = this.state;
    return (
      <div>
        <ul className="breadcrumb">
          {items.map((item) => {
            const classes = `breadcrumb-item-${item.textNode.replace(' ', '-').toLowerCase()}`;
            return (
              <li key={item.textNode} className={classes}>
                <Link to={item.to}>{_.startCase(item.textNode)}</Link>
              </li>
            );
          })}
          <li dangerouslySetInnerHTML={{ __html: this.getTitle() }} />
        </ul>
        <script type="application/ld+json">
          {JSON.stringify(this.getJSONLD())}
        </script>
      </div>
    );
  }
}

export default BreadCrumbs;
