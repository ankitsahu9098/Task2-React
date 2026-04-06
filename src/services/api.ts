export async function get<TResult>(url: string) {
  return await request<TResult>('GET', url);
}

export async function post<TResult>(url: string, body: unknown) {
  return await request<TResult>('POST', url, body);
}

export async function del<TResult>(url: string, body: unknown) {
  return await request<TResult>('DELETE', url, body);
}

async function request<TResult>(method: string, url: string, body?: unknown, askUser?: string) {
  const response = await fetch('https://localhost:7040/api/master' + url, {
    method,
    body: body ? JSON.stringify(body) : undefined,
    headers: {
      Origin: window.location.host,
      'Content-Type': 'application/json; charset=utf-8',
    },
  });

  if (response.headers.get('Content-Length') === '0') {
    return;
  }

  const json = await response.json();

  return json as TResult;
}
