export interface ResponseCodeReview {
  candidates: Array<{
    content: {
      parts: Array<{
        text: string;
      }>;
      role: string;
    };
    finishReason: string;
    citationMetadata: {
      citationSources: Array<{
        startIndex: number;
        endIndex: number;
        uri: string;
      }>;
    };
    avgLogprobs: number;
  }>;
}
