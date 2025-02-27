/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface DocumentAdd {
  /**
   * Название
   * @minLength 1
   * @maxLength 100
   */
  name: string;
  /**
   * Описание
   * @minLength 1
   * @maxLength 500
   */
  description: string;
  /**
   * Срок изготовления
   * @min -2147483648
   * @max 2147483647
   */
  prod_period?: number | null;
  /**
   * Срок замены
   * @min -2147483648
   * @max 2147483647
   */
  replace_period?: number | null;
  /**
   * Длинна номера документа
   * @min -2147483648
   * @max 2147483647
   */
  number_length?: number | null;
  /**
   * Фото
   * @format uri
   */
  image?: string | null;
}

export interface Document {
  /** ID */
  id?: number;
  /** Image */
  image?: string;
  /**
   * Название
   * @minLength 1
   * @maxLength 100
   */
  name: string;
  /**
   * Описание
   * @minLength 1
   * @maxLength 500
   */
  description: string;
  /** Статус */
  status?: 1 | 2;
  /**
   * Срок изготовления
   * @min -2147483648
   * @max 2147483647
   */
  prod_period?: number | null;
  /**
   * Срок замены
   * @min -2147483648
   * @max 2147483647
   */
  replace_period?: number | null;
  /**
   * Длинна номера документа
   * @min -2147483648
   * @max 2147483647
   */
  number_length?: number | null;
}

export interface Request {
  /** ID */
  id?: number;
  /** Owner */
  owner?: string;
  /** Moderator */
  moderator?: string;
  /** Documents */
  documents?: string;
  /** Статус */
  status?: 1 | 2 | 3 | 4 | 5;
  /**
   * Дата создания
   * @format date-time
   */
  date_created?: string | null;
  /**
   * Дата формирования
   * @format date-time
   */
  date_formation?: string | null;
  /**
   * Дата завершения
   * @format date-time
   */
  date_complete?: string | null;
  /** Reason */
  reason?: string | null;
  /** Qr */
  qr?: string | null;
}

export interface DocumentRequest {
  /** ID */
  id?: number;
  /**
   * Комментарий
   * @minLength 1
   */
  comment?: string;
  /**
   * New document number
   * @min -9223372036854776000
   * @max 9223372036854776000
   */
  new_document_number?: number | null;
  /** Document */
  document?: number | null;
  /** Request */
  request?: number | null;
}

export interface UserLogin {
  /**
   * Username
   * @minLength 1
   */
  username: string;
  /**
   * Password
   * @minLength 1
   */
  password: string;
}

export interface UserRegister {
  /** ID */
  id?: number;
  /**
   * Адрес электронной почты
   * @format email
   * @maxLength 254
   */
  email?: string;
  /**
   * Пароль
   * @minLength 1
   * @maxLength 128
   */
  password: string;
  /**
   * Имя пользователя
   * Обязательное поле. Не более 150 символов. Только буквы, цифры и символы @/./+/-/_.
   * @minLength 1
   * @maxLength 150
   * @pattern ^[\w.@+-]+$
   */
  username: string;
}

export interface UserProfile {
  /**
   * Username
   * @minLength 1
   */
  username?: string;
  /**
   * Email
   * @minLength 1
   */
  email?: string;
  /**
   * Password
   * @minLength 1
   */
  password?: string;
}

import type { AxiosInstance, AxiosRequestConfig, AxiosResponse, HeadersDefaults, ResponseType } from "axios";
import axios from "axios";

export type QueryParamsType = Record<string | number, any>;

export interface FullRequestParams extends Omit<AxiosRequestConfig, "data" | "params" | "url" | "responseType"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseType;
  /** request body */
  body?: unknown;
}

export type RequestParams = Omit<FullRequestParams, "body" | "method" | "query" | "path">;

export interface ApiConfig<SecurityDataType = unknown> extends Omit<AxiosRequestConfig, "data" | "cancelToken"> {
  securityWorker?: (
    securityData: SecurityDataType | null,
  ) => Promise<AxiosRequestConfig | void> | AxiosRequestConfig | void;
  secure?: boolean;
  format?: ResponseType;
}

export enum ContentType {
  Json = "application/json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
  public instance: AxiosInstance;
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private secure?: boolean;
  private format?: ResponseType;

  constructor({ securityWorker, secure, format, ...axiosConfig }: ApiConfig<SecurityDataType> = {}) {
    this.instance = axios.create({ ...axiosConfig, baseURL: axiosConfig.baseURL || "http://localhost:8000/api" });
    this.secure = secure;
    this.format = format;
    this.securityWorker = securityWorker;
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected mergeRequestParams(params1: AxiosRequestConfig, params2?: AxiosRequestConfig): AxiosRequestConfig {
    const method = params1.method || (params2 && params2.method);

    return {
      ...this.instance.defaults,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...((method && this.instance.defaults.headers[method.toLowerCase() as keyof HeadersDefaults]) || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected stringifyFormItem(formItem: unknown) {
    if (typeof formItem === "object" && formItem !== null) {
      return JSON.stringify(formItem);
    } else {
      return `${formItem}`;
    }
  }

  protected createFormData(input: Record<string, unknown>): FormData {
    if (input instanceof FormData) {
      return input;
    }
    return Object.keys(input || {}).reduce((formData, key) => {
      const property = input[key];
      const propertyContent: any[] = property instanceof Array ? property : [property];

      for (const formItem of propertyContent) {
        const isFileType = formItem instanceof Blob || formItem instanceof File;
        formData.append(key, isFileType ? formItem : this.stringifyFormItem(formItem));
      }

      return formData;
    }, new FormData());
  }

  public request = async <T = any, _E = any>({
    secure,
    path,
    type,
    query,
    format,
    body,
    ...params
  }: FullRequestParams): Promise<AxiosResponse<T>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const responseFormat = format || this.format || undefined;

    if (type === ContentType.FormData && body && body !== null && typeof body === "object") {
      body = this.createFormData(body as Record<string, unknown>);
    }

    if (type === ContentType.Text && body && body !== null && typeof body !== "string") {
      body = JSON.stringify(body);
    }

    return this.instance.request({
      ...requestParams,
      headers: {
        ...(requestParams.headers || {}),
        ...(type ? { "Content-Type": type } : {}),
      },
      params: query,
      responseType: responseFormat,
      data: body,
      url: path,
    });
  };
}

/**
 * @title Snippets API
 * @version v1
 * @license BSD License
 * @termsOfService https://www.google.com/policies/terms/
 * @baseUrl http://localhost:8000/api
 * @contact <contact@snippets.local>
 *
 * Test description
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  cart = {
    /**
     * No description
     *
     * @tags cart
     * @name CartList
     * @request GET:/cart/
     * @secure
     */
    cartList: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/cart/`,
        method: "GET",
        secure: true,
        ...params,
      }),
  };
  documents = {
    /**
     * No description
     *
     * @tags documents
     * @name DocumentsList
     * @request GET:/documents/
     * @secure
     */
    documentsList: (
      query?: {
        document_name?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/documents/`,
        method: "GET",
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags documents
     * @name DocumentsCreateCreate
     * @request POST:/documents/create/
     * @secure
     */
    documentsCreateCreate: (
      data: {
        /**
         * @minLength 1
         * @maxLength 100
         */
        name: string;
        /**
         * @minLength 1
         * @maxLength 500
         */
        description: string;
        /**
         * @min -2147483648
         * @max 2147483647
         */
        prod_period?: number | null;
        /**
         * @min -2147483648
         * @max 2147483647
         */
        replace_period?: number | null;
        /**
         * @min -2147483648
         * @max 2147483647
         */
        number_length?: number | null;
        /** @format binary */
        image?: File | null;
      },
      params: RequestParams = {},
    ) =>
      this.request<DocumentAdd, any>({
        path: `/documents/create/`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.FormData,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags documents
     * @name DocumentsRead
     * @request GET:/documents/{document_id}/
     * @secure
     */
    documentsRead: (documentId: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/documents/${documentId}/`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags documents
     * @name DocumentsAddToRequestCreate
     * @request POST:/documents/{document_id}/add_to_request/
     * @secure
     */
    documentsAddToRequestCreate: (documentId: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/documents/${documentId}/add_to_request/`,
        method: "POST",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags documents
     * @name DocumentsDeleteDelete
     * @request DELETE:/documents/{document_id}/delete/
     * @secure
     */
    documentsDeleteDelete: (documentId: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/documents/${documentId}/delete/`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags documents
     * @name DocumentsImageList
     * @request GET:/documents/{document_id}/image/
     * @secure
     */
    documentsImageList: (documentId: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/documents/${documentId}/image/`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags documents
     * @name DocumentsUpdateUpdate
     * @request PUT:/documents/{document_id}/update/
     * @secure
     */
    documentsUpdateUpdate: (documentId: string, data: Document, params: RequestParams = {}) =>
      this.request<Document, any>({
        path: `/documents/${documentId}/update/`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags documents
     * @name DocumentsUpdateImageCreate
     * @request POST:/documents/{document_id}/update_image/
     * @secure
     */
    documentsUpdateImageCreate: (
      documentId: string,
      data: {
        /** @format binary */
        image?: File;
      },
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/documents/${documentId}/update_image/`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.FormData,
        ...params,
      }),
  };
  requests = {
    /**
     * No description
     *
     * @tags requests
     * @name RequestsList
     * @request GET:/requests/
     * @secure
     */
    requestsList: (
      query?: {
        status?: number;
        date_formation_start?: string;
        date_formation_end?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/requests/`,
        method: "GET",
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags requests
     * @name RequestsRead
     * @request GET:/requests/{request_id}/
     * @secure
     */
    requestsRead: (requestId: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/requests/${requestId}/`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags requests
     * @name RequestsDeleteDelete
     * @request DELETE:/requests/{request_id}/delete/
     * @secure
     */
    requestsDeleteDelete: (requestId: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/requests/${requestId}/delete/`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags requests
     * @name RequestsDeleteDocumentDelete
     * @request DELETE:/requests/{request_id}/delete_document/{document_id}/
     * @secure
     */
    requestsDeleteDocumentDelete: (requestId: string, documentId: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/requests/${requestId}/delete_document/${documentId}/`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags requests
     * @name RequestsUpdateUpdate
     * @request PUT:/requests/{request_id}/update/
     * @secure
     */
    requestsUpdateUpdate: (requestId: string, data: Request, params: RequestParams = {}) =>
      this.request<Request, any>({
        path: `/requests/${requestId}/update/`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags requests
     * @name RequestsUpdateDocumentUpdate
     * @request PUT:/requests/{request_id}/update_document/{document_id}/
     * @secure
     */
    requestsUpdateDocumentUpdate: (
      requestId: string,
      documentId: string,
      data: DocumentRequest,
      params: RequestParams = {},
    ) =>
      this.request<DocumentRequest, any>({
        path: `/requests/${requestId}/update_document/${documentId}/`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags requests
     * @name RequestsUpdateStatusAdminUpdate
     * @request PUT:/requests/{request_id}/update_status_admin/
     * @secure
     */
    requestsUpdateStatusAdminUpdate: (
      requestId: string,
      data: {
        status?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          status?: number;
        },
        any
      >({
        path: `/requests/${requestId}/update_status_admin/`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags requests
     * @name RequestsUpdateStatusUserUpdate
     * @request PUT:/requests/{request_id}/update_status_user/
     * @secure
     */
    requestsUpdateStatusUserUpdate: (requestId: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/requests/${requestId}/update_status_user/`,
        method: "PUT",
        secure: true,
        ...params,
      }),
  };
  users = {
    /**
     * No description
     *
     * @tags users
     * @name UsersLoginCreate
     * @request POST:/users/login/
     * @secure
     */
    usersLoginCreate: (data: UserLogin, params: RequestParams = {}) =>
      this.request<UserLogin, any>({
        path: `/users/login/`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags users
     * @name UsersLogoutCreate
     * @request POST:/users/logout/
     * @secure
     */
    usersLogoutCreate: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/users/logout/`,
        method: "POST",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags users
     * @name UsersRegisterCreate
     * @request POST:/users/register/
     * @secure
     */
    usersRegisterCreate: (data: UserRegister, params: RequestParams = {}) =>
      this.request<UserRegister, any>({
        path: `/users/register/`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags users
     * @name UsersUpdateUpdate
     * @request PUT:/users/{user_id}/update/
     * @secure
     */
    usersUpdateUpdate: (userId: string, data: UserProfile, params: RequestParams = {}) =>
      this.request<UserProfile, any>({
        path: `/users/${userId}/update/`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
}
