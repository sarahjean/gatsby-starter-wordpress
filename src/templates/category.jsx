import React from "react";
import Helmet from "react-helmet";
import styled from "styled-components";
import config from "../../data/SiteConfig";
import TopNavigation from "../components/Layout/Navigation/Navigation";
import PostListing from "../components/Posts/PostListing/PostListing";

export default class CategoryTemplate extends React.Component {
  render() {
    const category = this.props.pathContext.name;
    const postEdges = this.props.data.allWordpressPost.edges;
    return (
      <div className="tag-container">
        <Helmet title={`Posts tagged as "${category}" | ${config.siteTitle}`} />
        <TopNavigation pages={this.props.data.allWordpressPage} />
        <MainContentContainer>
          <h1>Category: {category}</h1>
          <PostListing postEdges={postEdges} />
        </MainContentContainer>
      </div>
    );
  }
}
const MainContentContainer = styled.main`
  width: 600px;
  margin: 50px auto;

  h1 {
    text-align: center;
    font-weight: 700;
    margin-bottom: 25px;
  }

  p {
    font-size: 16px;
    margin-bottom: 25px;
  }

  pre {
    background-color: grey;
  }
`;

/* eslint no-undef: "off"*/
export const pageQuery = graphql`
  query CategoryPage($slug: String!) {
    allWordpressPost(filter: { categories: { slug: { eq: $slug } } }) {
      edges {
        node {
          featured_media {
            localFile {
              childImageSharp {
                resolutions(width: 600, height: 200) {
                  ...GatsbyImageSharpResolutions
                }
              }
            }
          }
          author {
            name
            avatar_urls {
              wordpress_24
              wordpress_48
              wordpress_96
            }
          }
          date(formatString: "D MMM YYYY HH:mm")
          slug
          title
          modified
          excerpt
          id
          categories {
            name
          }
          tags {
            name
          }
          content
        }
      }
    }
    allWordpressPage {
      edges {
        node {
          slug
          title
          id
        }
      }
    }
  }
`;
