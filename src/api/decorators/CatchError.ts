import { ProxyResultBuilder } from '../builders/ProxyResultBuilder';

export function CatchError(): any {
    return (
        _: Record<string, unknown>,
        __: string,
        descriptor: PropertyDescriptor
    ): PropertyDescriptor => {
        const originalValue = descriptor.value;
        descriptor.value = async function (...args: any[]): Promise<any> {
            try {
                return await originalValue.apply(this, args);
            } catch (error) {
                if (error.status) {
                    return (error as ProxyResultBuilder).build();
                }
                return new ProxyResultBuilder().status(500).body({message: 'Internal Server Error'}).build();
            }
        };
        return descriptor;
    };
}
