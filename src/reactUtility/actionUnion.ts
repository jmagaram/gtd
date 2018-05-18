export type T<Map extends { [actionKey: string]: (...args: any[]) => any }> = ReturnType<Map[keyof Map]>