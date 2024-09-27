// 基本类型定义
// 描述 OpenAPI 模式中可能的基本类型
export type SchemaType =
  | 'string'
  | 'number'
  | 'integer'
  | 'boolean'
  | 'array'
  | 'object';

// 描述路径条目对象的记录类型
export type RecordPathItemObject = Record<string, PathItemObject>;

// 描述常用的内容类型
export type ContentType =
  | 'application/json'
  | 'application/xml'
  | 'application/x-www-form-urlencoded'
  | 'multipart/form-data';

// OpenAPI 主接口
// 描述 OpenAPI 文档的根对象
export interface OpenAPI {
  openapi: string; // OpenAPI 规范版本
  info: InfoObject; // API 的元信息
  servers?: ServerObject[]; // 服务器列表
  paths: RecordPathItemObject; // API 路径及其操作
  components?: ComponentsObject; // 组件对象
  security?: SecurityRequirementObject[]; // 全局安全性要求
  tags?: TagObject[]; // 标签列表
  externalDocs?: ExternalDocumentationObject; // 外部文档信息
}

// 信息对象
// 提供 API 的元信息
export interface InfoObject {
  title: string; // API 的标题
  description?: string; //  API 描述
  termsOfService?: string; // 服务条款 URL
  contact?: ContactObject; // 联系人信息
  license?: LicenseObject; // 许可证信息
  version: string; // API 的版本
}

// 联系人对象
// 描述 API 的联系人信息
export interface ContactObject {
  name?: string; // 联系人姓名
  url?: string; // 联系人 URL
  email?: string; // 联系人电子邮件
}

// 许可证对象
// 描述 API 的许可证信息
export interface LicenseObject {
  name: string; // 许可证名称
  url?: string; // 许可证 URL
}

// 服务器对象
// 描述 API 服务器
export interface ServerObject {
  url: string; // 服务器 URL
  description?: string; // 服务器描述
  variables?: { [variable: string]: ServerVariableObject }; // 服务器变量
}

// 服务器变量对象
// 描述服务器 URL 中的变量
export interface ServerVariableObject {
  enum?: string[]; // 枚举值
  default: string; // 默认值
  description?: string; // 描述
}

// 路径条目对象
// 描述路径及其操作
export interface PathItemObject {
  $ref?: string; // 引用
  summary?: string; // 摘要
  description?: string; // 描述
  get?: OperationObject; //  GET 操作
  put?: OperationObject; //  PUT 操作
  post?: OperationObject; //  POST 操作
  delete?: OperationObject; //  DELETE 操作
  options?: OperationObject; //  OPTIONS 操作
  head?: OperationObject; //  HEAD 操作
  patch?: OperationObject; //  PATCH 操作
  trace?: OperationObject; //  TRACE 操作
  servers?: ServerObject[]; // 特定于路径的服务器列表
  parameters?: ParameterObject[] | ReferenceObject[]; // 参数列表
}

// 操作对象
// 描述单个 API 操作
export interface OperationObject {
  tags?: string[]; // 标签列表
  summary?: string; // 摘要
  description?: string; // 描述
  externalDocs?: ExternalDocumentationObject; // 外部文档
  operationId?: string; // 操作 ID
  parameters?: (ParameterObject | ReferenceObject)[]; // 参数列表
  requestBody?: RequestBodyObject | ReferenceObject; // 请求体
  responses: { [statusCode: string]: ResponseObject | ReferenceObject }; // 响应对象
  callbacks?: { [callback: string]: CallbackObject | ReferenceObject }; // 回调对象
  deprecated?: boolean; // 废弃标志
  security?: SecurityRequirementObject[]; // 安全性要求
  servers?: ServerObject[]; // 特定于操作的服务器列表
  ['x-controller-annotations']?: string[]; // 控制器注解
  [extension: string]: any; // 扩展字段
}

// 外部文档对象
// 描述外部文档
export interface ExternalDocumentationObject {
  description?: string; // 描述
  url: string; // 文档 URL
}

// 参数对象
// 描述操作的参数
export interface ParameterObject {
  name: string; // 参数名称
  in: 'query' | 'header' | 'path' | 'cookie'; // 参数位置
  description?: string; // 描述
  required?: boolean; // 必需标志
  deprecated?: boolean; // 废弃标志
  allowEmptyValue?: boolean; // 允许空值标志
  style?: string; // 样式
  explode?: boolean; // 展开标志（用于数组和对象）
  allowReserved?: boolean; // 允许保留字符标志
  schema?: SchemaObject | ReferenceObject; // 模式对象
  example?: any; // 示例值
  examples?: { [media: string]: ExampleObject | ReferenceObject }; // 示例对象
  content?: { [media: string]: MediaTypeObject }; // 内容对象
}

export type ParameterObjectSchema = SchemaObject | ReferenceObject;

// 参考对象
// 用于引用其他对象
export interface ReferenceObject {
  $ref: string; // 引用的路径
}

// 请求体对象
// 描述请求体
export interface RequestBodyObject {
  description?: string; // 描述
  content: { [media: string]: MediaTypeObject }; // 内容对象
  required?: boolean; // 必需标志
}

// 媒体类型对象
// 描述媒体类型及其模式
export interface MediaTypeObject {
  schema?: SchemaObject | ReferenceObject; // 模式对象
  example?: any; // 示例值
  examples?: { [media: string]: ExampleObject | ReferenceObject }; // 示例对象
  encoding?: { [media: string]: EncodingObject }; // 编码对象
}

// 头对象
// 描述响应头
export interface HeaderObject {
  description?: string; // 描述
  required?: boolean; // 必需标志
  deprecated?: boolean; // 废弃标志
  allowEmptyValue?: boolean; // 允许空值标志
  style?: string; // 样式
  explode?: boolean; // 展开标志（用于数组和对象）
  allowReserved?: boolean; // 允许保留字符标志
  schema?: SchemaObject | ReferenceObject; // 模式对象
  example?: any; // 示例值
  examples?: { [media: string]: ExampleObject | ReferenceObject }; // 示例对象
  content?: { [media: string]: MediaTypeObject }; // 内容对象
}

// 编码对象
// 描述内容的编码信息
export interface EncodingObject {
  contentType?: string; // 内容类型
  headers?: { [header: string]: HeaderObject | ReferenceObject }; // 头对象
  style?: string; // 样式
  explode?: boolean; // 展开标志（用于数组和对象）
  allowReserved?: boolean; // 允许保留字符标志
}

// 响应对象
// 描述响应信息
export interface ResponseObject {
  description: string; // 响应描述
  headers?: { [header: string]: HeaderObject | ReferenceObject }; // 头对象
  content?: { [media: string]: MediaTypeObject }; // 内容对象
  links?: { [link: string]: LinkObject | ReferenceObject }; // 链接对象
}

// 回调对象
// 描述回调 URL 及其操作
export interface CallbackObject {
  [url: string]: PathItemObject | ReferenceObject; // 回调路径条目
}

// 安全需求对象
// 描述全局或操作的安全性要求
export interface SecurityRequirementObject {
  [name: string]: string[]; // 安全方案名称及其作用域
}

// 组件对象
// 描述可重用的组件
export interface ComponentsObject {
  schemas?: { [key: string]: SchemaObject | ReferenceObject }; // 模式对象
  responses?: { [key: string]: ResponseObject | ReferenceObject }; // 响应对象
  parameters?: { [key: string]: ParameterObject | ReferenceObject }; // 参数对象
  examples?: { [key: string]: ExampleObject | ReferenceObject }; // 示例对象
  requestBodies?: { [key: string]: RequestBodyObject | ReferenceObject }; // 请求体对象
  headers?: { [key: string]: HeaderObject | ReferenceObject }; // 头对象
  securitySchemes?: { [key: string]: SecuritySchemeObject | ReferenceObject }; // 安全方案对象
  links?: { [key: string]: LinkObject | ReferenceObject }; // 链接对象
  callbacks?: { [key: string]: CallbackObject | ReferenceObject }; // 回调对象
}

// 模式对象
// 描述数据的结构和约束
export interface SchemaObject {
  type?: SchemaType; // 基本类型
  format?: string; // 格式
  nullable?: boolean; // 可空标志
  enum?: any[]; // 枚举值
  const?: any; // 常量值
  multipleOf?: number; // 倍数
  maximum?: number; // 最大值
  exclusiveMaximum?: number; // 排他最大值
  minimum?: number; // 最小值
  exclusiveMinimum?: number; // 排他最小值
  maxLength?: number; // 最大长度
  minLength?: number; // 最小长度
  pattern?: string; // 正则表达式模式
  items?: SchemaObject | ReferenceObject; // 数组项模式
  allOf?: (SchemaObject | ReferenceObject)[]; // 所有模式
  oneOf?: (SchemaObject | ReferenceObject)[]; // 一个模式
  anyOf?: (SchemaObject | ReferenceObject)[]; // 任意模式
  not?: SchemaObject | ReferenceObject; // 非模式
  properties?: { [propertyName: string]: SchemaObject | ReferenceObject }; // 属性模式
  additionalProperties?: boolean | SchemaObject | ReferenceObject; // 附加属性模式
  description?: string; // 描述
  default?: any; // 默认值
  required?: string[]; // 必需属性列表
  title?: string; // 标题
  readOnly?: boolean; // 只读标志
  writeOnly?: boolean; // 只写标志
  example?: any; // 示例值
  deprecated?: boolean; // 废弃标志
}

// 示例对象
// 描述具体的示例值
export interface ExampleObject {
  summary?: string; // 摘要
  description?: string; // 描述
  value?: any; // 示例值
  externalValue?: string; // 外部示例 URL
}

// 链接对象
// 描述操作之间的关系
export interface LinkObject {
  operationRef?: string; // 操作引用
  operationId?: string; // 操作 ID
  parameters?: { [parameter: string]: any }; // 参数映射
  requestBody?: any; // 请求体
  description?: string; // 描述
  server?: ServerObject; // 服务器对象
}

// 安全方案对象
// 描述安全方案
export interface SecuritySchemeObject {
  type: 'apiKey' | 'http' | 'oauth2' | 'openIdConnect'; // 安全方案类型
  description?: string; // 描述
  name?: string; // 名称（apiKey 类型）
  in?: 'query' | 'header' | 'cookie'; // 位置（apiKey 类型）
  scheme?: string; //  HTTP 验证方案（http 类型）
  bearerFormat?: string; //  Bearer 格式（http 类型）
  flows?: OAuthFlowsObject; //  OAuth 流（oauth2 类型）
  openIdConnectUrl?: string; //  OpenID Connect URL（openIdConnect 类型）
}

// OAuth 流对象
// 描述 OAuth 流
export interface OAuthFlowsObject {
  implicit?: OAuthFlowObject; // 隐式流
  password?: OAuthFlowObject; // 密码流
  clientCredentials?: OAuthFlowObject; // 客户端凭证流
  authorizationCode?: OAuthFlowObject; // 授权码流
}

// OAuth 流对象
// 描述单个 OAuth 流
export interface OAuthFlowObject {
  authorizationUrl?: string; // 授权 URL
  tokenUrl?: string; // 令牌 URL
  refreshUrl?: string; // 刷新 URL
  scopes: { [scope: string]: string }; // 作用域及其描述
}

// 标签对象
// 描述 API 的标签
export interface TagObject {
  name: string; // 标签名称
  description?: string; // 描述
  externalDocs?: ExternalDocumentationObject; // 外部文档
}
