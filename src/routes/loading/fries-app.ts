import type { Omu } from '@omujs/omu';
import { RegistryType, type Registry } from '@omujs/omu/api/registry';
import { SignalType, type Signal } from '@omujs/omu/api/signal';
import type { Writable } from 'svelte/store';
import { LOADING_APP } from './app.js';
import type { State } from './state.js';

const TEST_SIGNAL = SignalType.createJson<null>(LOADING_APP.join('test'), {
    name: 'test',
});

type Config = {
    text: string;
    hint: string;
};

const CONFIG_REGISTRY = RegistryType.createJson<Config>(LOADING_APP, {
    name: 'config',
    defaultValue: {
        text: '芋準備中',
        hint: 'コメントで🍟を投げてみよう！',
    },
});

const STATE_REGISTRY = RegistryType.createJson<State>(LOADING_APP, {
    name: 'state',
    defaultValue: {
        type: 'idle',
        start: performance.now(),
    },
});

export function toSvelteStore<T>(registry: Registry<T>): Writable<T> & {
    wait: () => Promise<void>;
} {
    let ready = false;
    let value: T = registry.value;
    const listeners = new Set<(value: T) => void>();

    registry.listen((newValue) => {
        ready = true;
        value = newValue;
        listeners.forEach((run) => run(value));
    });

    return {
        set: (val: T) => {
            if (!ready) throw new Error(`Registry ${registry.type.id.key()} is not ready`);
            registry.set(val);
        },
        subscribe: (run) => {
            listeners.add(run);
            run(value);
            return () => listeners.delete(run);
        },
        update: (fn) => {
            if (!ready) throw new Error(`Registry ${registry.type.id.key()} is not ready`);
            registry.update(fn);
        },
        wait: () => new Promise<void>((resolve) => {
            if (ready) resolve();
            else listeners.add(() => resolve());
        }),
    };
}

export class FriesApp {
    public testSignal: Signal<null>;
    public config: Writable<Config>;
    public state: Writable<State>;

    constructor(omu: Omu) {
        this.testSignal = omu.signals.get(TEST_SIGNAL);
        this.config = toSvelteStore(omu.registries.get(CONFIG_REGISTRY));
        this.state = toSvelteStore(omu.registries.get(STATE_REGISTRY));
    }

    public async test() {
        this.testSignal.notify(null);
    }
}
