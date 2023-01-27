const compare = (prev: unknown, newValue: unknown) =>
    JSON.stringify(prev) !== JSON.stringify(newValue);

export default compare;
