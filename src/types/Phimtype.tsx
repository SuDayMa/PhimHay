export interface QuocGia {
  _id: string;
  name: string;
  slug: string;
}
export interface Theloai {
  _id: string;
  name: string;
  slug: string;
}
export interface MovieResponse {
    status: boolean;
    items: Array<{
        tmdb: {
            type: string;
            id: string;
            season: number;
            vote_average: number;
            vote_count: number;
        },
        imdb: {
            id: null;
        },
        modified: {
            time : string;
        },
        _id: string;
        name: string;
        slug: string;
        origin_name: string;
        poster_url: string;
        thumb_url: string;
        year: number;
    }>;
    pagination: {
        totalItems: number;
        totalItemsPerPage: number;
        currentPage: number;
        totalPages: number;
    };
}
export interface QuocGiaResponse {
    status: string;
    msg: null;
    data: {
        seoOnPage: {
            og_type: string
            titleHead: string
            descriptionHead: string;
            og_image: Array<{
                url: string;
                alt: string;
            }>;
            og_url: string;
        }
        breadCrumb:Array<{ 
            name: string
            slug: string
            isCurrent: boolean
            position: number
        }>;
        titlePage: string;
        items: Array<{
            tmdb: {
            type: string;
            id: number;
            season: number;
            vote_average: number;
            vote_count: number;
        },
        imdb: {
            id: null;
        },
        modified: {
            time : string;
        },
        _id: string;
        name: string;
        slug: string;
        origin_name: string;
        type: string;
        poster_url: string;
        thumb_url: string;
        sub_docquyen: boolean;
        chieurap: boolean;
        time: string;
        episode_current: string;
        quality: string;
        lang: string;
        year: number;
        category: Array <{
            id: string;
            name: string;
            slug: string;
        }>;
        country: Array<{
            id: string;
            name: string;
            slug: string;
        }>;
        }>;
        params: {
            type_slug: string;
            slug: string;
            filterCategory: Array<{
                category: string;
            }>;
            filterCountry: Array<{
                country: string;
            }>;
            filterYear: Array<{
                year: string;
            }>;
            filterType: Array<{
                sort_lang: string;
            }>;
            sortField: string;
            sortType: string;
            pagination: {
                totalItems: number;
                totalItemsPerPage: number;
                currentPage: number;
                totalPages: number;
            };
        };
        type_list: string;
        APP_DOMAIN_FRONTEND: string;
        APP_DOMAIN_CDN_IMAGE: string;
    };


}
export interface TheloaiResponse {
    status: string;
    msg: null;
    data: {
        seoOnPage: {
            og_type: string
            titleHead: string
            descriptionHead: string;
            og_image: Array<{
                url: string;
                alt: string;
            }>;
            og_url: string;
        }
        breadCrumb:Array<{ 
            name: string
            slug: string
            isCurrent: boolean
            position: number
        }>;
        titlePage: string;
        items: Array<{
            tmdb: {
            type: string;
            id: number;
            season: number;
            vote_average: number;
            vote_count: number;
        },
        imdb: {
            id: null;
        },
        modified: {
            time : string;
        },
        _id: string;
        name: string;
        slug: string;
        origin_name: string;
        type: string;
        poster_url: string;
        thumb_url: string;
        sub_docquyen: boolean;
        chieurap: boolean;
        time: string;
        episode_current: string;
        quality: string;
        lang: string;
        year: number;
        }>;
        category: Array <{
            id: string;
            name: string;
            slug: string;
        }>;
        country: Array<{
            id: string;
            name: string;
            slug: string;
        }>;
        params: {
            type_slug: string;
            slug: string;
            filterCategory: Array<{
                category: string;
            }>;
            filterCountry: Array<{
                country: string;
            }>;
            filterYear: Array<{
                year: string;
            }>;
            filterType: Array<{
                type: string;
            }>;
            sortField: string;
            sortType: string;
            pagination: {
                totalItems: number;
                totalItemsPerPage: number;
                currentPage: number;
                totalPages: number;
            };
        };
        type_list: string;
        APP_DOMAIN_FRONTEND: string;
        APP_DOMAIN_CDN_IMAGE: string;
    }
}
export interface Phim{
    status: boolean;
    msg: null;
    movie:{
        tmdb:{
            type: string;
            id: number;
            season: null;
            vote_average: number;
            vote_count: number;
        }
        imdb: {
            id: null;
        }
        created: {
            time: string;
        }
        modified: {
            time: string;
        }
        _id: string;
        name: string;
        slug: string;
        origin_name: string;
        content: string;
        type: string;
        poster_url: string;
        thumb_url: string;
        is_sub_docquyen: boolean;
        sub_docquyen: boolean;
        chieurap: boolean;
        trailer: string;
        time: string;
        episode_current: string;
        episode_total: number;
        quality: string;
        lang: string;
        notify: null;
        showtimes: null;
        year: number;
        view: number;
        actor: Array<{
            name: string;
        }>;
        director: Array<{
            name: string;
        }>;
        category: Array<{
            id: string;
            name: string;
            slug: string;
        }>;
        country: Array<{
            id: string;
            name: string;
            slug: string;
        }>;
    }
    episodes: Array<{
        server_name: string;
        server_data: Array<{
            name: string;
            slug: string;
            filename: string;
            link_embed: string;
            link_m3u8: string;
        }>;
    }>;
}

export interface Danhsach {
    status: boolean;
    msg: null;
    data: {
        seoOnPage: {
            og_type: string;
            titleHead: string;
            descriptionHead: string;
            og_image: Array<{
                url: string;
                alt: string;
            }>;
            og_url: string;
        }
        breadCrumb: Array<{
            name: string;
            slug: string;
            isCurrent: boolean;
            position: number;
        }>;
        titlePage: string;
        items: Array<{
            tmdb: {
                type: string;
                id: number;
                season: number;
                vote_average: number;
                vote_count: number;
            },
            imdb: {
                id: null;
            },
            created: {
                time: string;
            },
            modified: {
                time: string;
            }
            _id: string;
            name: string;
            slug: string;
            origin_name: string;
            type: string;
            poster_url: string;
            thumb_url: string;
            sub_docquyen: boolean;
            chieurap: boolean;
            time: string;
            episode_current: string;
            quality: string;
            lang: string;
            year: number;
            category: Array<{
                id: string;
                name: string;
                slug: string;
            }>;
            country: Array<{
                id: string;
                name: string;
                slug: string;
            }>;
        }>;
        params: {
            type_slug: string;
            filterCategory: Array<{
                category: string;
            }>;
            filterCountry: Array<{
                country: string;
            }>;
            filterYear: Array<{
                year: string;
            }>;
            sortField: string;
            sortType: string;
            pagination: {
                totalItems: number;
                totalItemsPerPage: number;
                currentPage: number;
                totalPages: number;
            }
    }
        type_list: string;
        APP_DOMAIN_FRONTEND: string;
        APP_DOMAIN_CDN_IMAGE: string;
}
}
export interface PhimNewUpate{
    status: boolean;
    items: Array<{
        tmdb: {
            type: string;
            id: number;
            season: null;
            vote_average: number;
            vote_count: number;
        }
        imdb: {
            id: null;
        }
        modified: {
            time: string;
        }
        _id: string;
        name: string;
        slug: string;
        origin_name: string;
        type: string;
        poster_url: string;
        thumb_url: string;
        sub_docquyen: boolean;
        time: string;
        episode_current: string;
        quality: string;
        lang: string;
        year: number;
        category: Array<{
            id: string;
            name: string;
            slug: string;
        }>;
        country: Array<{
            id: string;
            name: string;
            slug: string;
        }>;
    }>
    pagination: {
        totalItems: number;
        totalItemsPerPage: number;
        currentPage: number;
        totalPages: number;
    };

} 
export interface SearchMovie {
    status: boolean;
    msg: null;
    data:{
        seoOnPage: {
            og_type: string;
            titleHead: string;
            descriptionHead: string;
            og_image: Array<{
                url: string
                alt: string
            }>
            og_url: string;
        }
        breadCrumb: Array<{
            name: string;
            isCurrent: boolean;
            position: number;
        }>
        titlePage: string;
        items: Array<{
            tmb: {
                type: string;
                id: number;
                season: null;
                vote_average: number;
                vote_count: number;
            }
            imdb: {
                id: null;
            }
            created: {
                time: string;
            }
            modified: {
                time: string;
            }
            _id: string;
            name: string;
            slug: string;
            origin_name: string;
            type: string;
            poster_url: string;
            thumb_url: string;
            sub_docquyen: boolean;
            chieurap: boolean;
            time: string;
            episode_current: string;
            quality: string;
            lang: string;
            year: number;
            category: Array<{
                id: string;
                name: string;
                slug: string;
            }>
            country: Array <{
                id: string;
                name: string;
                slug: string;
            }>
        }>
        params: {
            type_slug: string;
            keyword: string;
            filterCategory: Array<{
                
            }>
            filterCountry: Array<{

            }>
            filterYear: Array<{

            }>
             filterType: Array<{

            }>
            sortField: string;
            sortType: string;
            pagination: {
                totalItems: number;
                totalItemsPerPage: number;
                currentPage: number;
                totalPages: number;
            }
        }
        type_list: null;
        APP_DOMAIN_FRONTEND: string;
        APP_DOMAIN_CDN_IMAGE: string;
    }
}

export interface Year {
    status: boolean;
    msg: null
    data: {
        seoOnpage: {
            og_type: string;
            titleHead: string;
            descriptionHead: string;
            og_image: Array<{

            }>
            og_url: string;
        }
        breadCrumb: Array<{
            name: string;
            slug: string;
            isCurrent: boolean;
            position: number;
        }>
        titlePage: string;
        items: Array<{
            tmdb:{
                type: string;
                id: number;
                season: number;
                vote_average: number;
                vote_count: number;
            }
            imdb: {
                id: null;
            }
            created: {
                time: string;
            }
            modified: {
                time: string;
            }
            id: string;
            name: string;
            slug: string;
            origin_name: string;
            type: string;
            poster_url: string;
            thumb_url: string;
            sub_docquyen: boolean;
            chieurap: boolean;
            time: string;
            episode_current: string;
            quality: string;
            lang: string;
            year: number;
            category: Array<{
                id: string;
                name: string;
                slug: string;
            }>
            country: Array<{
                id: string;
                name: string;
                slug: string;
            }>
        }>
        params: {
            type_slug: string;
            filterCategory: Array<{

            }>
            filterCountry: Array<{

            }>
            filterYear: number;
            filterType: string;
            sortField: string;
            sortType: string;
            pagination: {
                totalItems: number;
                totalItemsPerPage: number;
                currentPage: number;
                totalPages: number;
            }
        }
        type_list: number;
        APP_DOMAIN_FRONTEND: string;
        APP_DOMAIN_CDN_IMAGE: string;
    }
}