export interface BaseComponentOptions {
    /**
     * A unique alphanumeric ID for this component. This must be provided for
     * hot-reloading and command deployment purposes.
     */
    id: string;
    /**
     * Whether this component is **enabled**. Defaults to `true`.
     */
    enabled?: boolean;
    /**
     * Whether this component is pending or being used. This is used to determine
     * if it is safe to disable/remove the component. In most cases, you should not change this yourself.
     * @internal
     */
    pendingUse?: boolean;
}
