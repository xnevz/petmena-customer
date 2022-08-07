
declare module '*.png' {
    const value: import('react-native').ImageSourcePropType;
    export default value;
}

declare module 'app.json' {
    var name: string;
}
