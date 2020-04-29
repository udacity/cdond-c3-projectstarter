export namespace HttpService {
  export interface Options {
    params: any;
  }

  export interface Pagination {
    page?: number;
    pageSize?: number;
  }
}

export class HttpService {
  public async get(url: string, options?: HttpService.Options) {
    let newUrl = url;

    if (options && options.params) {
      const queryParams = this.getQueryStringFromParams(options.params);
      newUrl = newUrl + queryParams;
    }
    const response = await fetch(newUrl, {});
    switch (response.status) {
      case 500:
      case 404:
      case 400:
        throw response;
    }
    return response.json();
  }

  public async post(url: string, data: any) {
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify(data),
      method: 'POST',
    });
    switch (response.status) {
      case 500:
      case 404:
      case 400:
        throw response;
    }
    return response;
  }

  public async put(url: string, data: any) {
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify(data),
      method: 'PUT',
    });
    switch (response.status) {
      case 500:
      case 404:
      case 400:
        throw response;
    }
    return response;
  }

  public async delete(url: string) {
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      // body: JSON.stringify(data),
      method: 'DELETE',
    });
    switch (response.status) {
      case 500:
      case 404:
      case 400:
        throw response;
    }
    return response;
  }

  private getQueryStringFromParams(params: any): string {
    let queryString = '?';
    queryString += Object.keys(params)
      .map((key: string) => {
        const value = params[key];
        if (!value || value === 'undefined' || typeof value === 'object') {
          return '';
        }
        return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
      })
      .join('&');
    return queryString;
  }
}
