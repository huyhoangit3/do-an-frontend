import { environment } from "src/environments/environment"

export class API {
  public static readonly CATEGORY = `${environment.baseApiUrl}/categories`
  public static readonly PRODUCT = `${environment.baseApiUrl}/products`
  public static readonly INVOICE = `${environment.baseApiUrl}/invoices`
  public static readonly ORDER = `${environment.baseApiUrl}/orders`
  public static readonly ACCOUNT = `${environment.baseApiUrl}/accounts`
  public static readonly CUSTOMER = `${environment.baseApiUrl}/customers`
  public static readonly FILE = `${environment.baseApiUrl}/files`
  public static readonly AUTH = `${environment.baseApiUrl}/auth`
}
