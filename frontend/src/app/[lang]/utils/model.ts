type StrapiResponse<T> = {
  data: T;
  message: string;
};

export interface Attribute {
  url: string;
  alternativeText?: any;
  caption?: any;
  width: number;
  height: number;
}

export interface Data {
  id: number;
  attributes: Attribute;
}

export interface Picture {
  data: Data;
}

export interface Button {
  id: number;
  url: string;
  newTab: boolean;
  text: string;
  type: string;
}

export interface ContentSection {
  id: number;
  __component: string;
  title: string;
  description: string;
  picture: Picture;
  buttons: Button[];
}

export interface Attribute {
  shortName: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string;
  heading?: any;
  description?: any;
  contentSections: ContentSection[];
}

export interface Data {
  id: number;
  attributes: Attribute;
}

export interface Pagination {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}

export interface Meta {
  pagination: Pagination;
}

export interface RootObject {
  data: Data[];
  meta: Meta;
}
export interface Article {
  id: 4;
  attributes: {
    title: string;
    description: string;
    slug: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    cover: {
      data: {
        attributes: {
          url: string;
        };
      };
    };
    category: {
      data: {
        attributes: {
          name: string;
          slug: string;
        };
      };
    };
    authorsBio: {
      data: {
        attributes: {
          name: string;
          avatar: {
            data: {
              attributes: {
                url: string;
              };
            };
          };
        };
      };
    };
  };
}

export interface Topics {
  attributes: {
    name: string;
    slug: string;
    articles: {
      data: Array<any>[];
    };
  };
}
