type GraphQLResponse<T> = {
  data: T;
  errors?: { message: string }[];
};

export class GraphQLError extends Error {
  constructor(
    message: string,
    public readonly status?: number,
    public readonly body?: string
  ) {
    super(message);
    this.name = "GraphQLError";
  }
}

export async function fetchGraphQL<T>(
  query: string,
  variables?: Record<string, unknown>,
  revalidate = 3600
): Promise<T> {
  const endpoint = process.env.HYGRAPH_ENDPOINT;
  const token = process.env.HYGRAPH_TOKEN;

  if (!endpoint || !token) {
    throw new GraphQLError(
      "Missing HYGRAPH_ENDPOINT or HYGRAPH_TOKEN environment variables"
    );
  }

  const res = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ query, variables }),
    next: { tags: ["cms"], revalidate },
  });

  if (!res.ok) {
    let body = "";
    try {
      body = await res.text();
    } catch {
      // ignore
    }
    throw new GraphQLError(
      `Hygraph returned HTTP ${res.status}. Check that your schema models exist in the Hygraph dashboard.\nResponse body: ${body}`,
      res.status,
      body
    );
  }

  const json: GraphQLResponse<T> = await res.json();

  if (json.errors?.length) {
    throw new GraphQLError(
      `GraphQL schema errors:\n${json.errors.map((e) => e.message).join("\n")}`
    );
  }

  return json.data;
}
