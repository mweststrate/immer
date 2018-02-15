export type MutableState<T extends {[x: string]: any}, K extends string> = {
	[P in K]: T[P];
}

export type Recipe<S> = (this: S, draftState: MutableState<S, keyof S>) => void;

/**
 * Immer takes a state, and runs a function against it.
 * That function can freely mutate the state, as it will create copies-on-write.
 * This means that the original state will stay unchanged, and once the function finishes, the modified state is returned
 *
 * If only one argument is passed, this is interpreted as the recipe, and will create a curried function that will execute the recipe
 * any time it is called with a base state
 *
 * @param currentState - the state to start with
 * @param recipe - function that receives a proxy of the current state as first argument and which can be freely modified
 * @returns The next state: a new state, or the current state if nothing was modified
 */
export default function<S = any>(
    currentState: S,
    recipe?: Recipe<S>
): S
// curried invocations
export default function<S = any, A = any, B = any, C = any>(
    recipe: (this: S, draftState: S, a: A, b: B, c: C) => void
): (currentState: S, a: A, b: B, c: C) => S
export default function<S = any, A = any, B = any>(
    recipe: (this: S, draftState: S, a: A, b: B) => void
): (currentState: S, a: A, b: B) => S
export default function<S = any, A = any>(
    recipe: (this: S, draftState: S, a: A) => void
): (currentState: S) => S
export default function<S = any>(
    recipe: (this: S, draftState: S, ...extraArgs: any[]) => void
): (currentState: S, ...extraArgs: any[]) => S

/**
 * Automatically freezes any state trees generated by immer.
 * This protects against accidental modifications of the state tree outside of an immer function.
 * This comes with a performance impact, so it is recommended to disable this option in production.
 * It is by default enabled.
 */
export function setAutoFreeze(autoFreeze: boolean): void

/**
 * Manually override whether proxies should be used.
 * By default done by using feature detection
 */
export function setUseProxies(useProxies: boolean): void
