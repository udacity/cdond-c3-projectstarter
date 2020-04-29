export const isInputEmpty = (content: string) => content.length === 0;

export const doesInputMatchesEmailPattern = (content: string) => /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/.test(content);

export const isInputGreaterThanOrEqualMinValue = (value: number, minValue: number) => value >= minValue;