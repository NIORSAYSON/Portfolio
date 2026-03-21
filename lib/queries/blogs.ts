export const GET_ALL_BLOG_POSTS = `
  query GetAllBlogPosts {
    blogPosts(orderBy: date_DESC, first: 100) {
      id
      slug
      title
      date
      category
      tags
      excerpt
      coverImage {
        url
      }
      featured
      readingTime
    }
  }
`;

export const GET_BLOG_POST_BY_SLUG = `
  query GetBlogPostBySlug($slug: String!) {
    blogPost(where: { slug: $slug }) {
      id
      slug
      title
      date
      category
      tags
      excerpt
      coverImage {
        url
      }
      content {
        raw
        html
        text
      }
      featured
      readingTime
    }
  }
`;
