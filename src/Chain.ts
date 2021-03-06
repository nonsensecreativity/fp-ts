import { HKT, HKTS } from './HKT'
import { Apply, FantasyApply } from './Apply'
import { Kleisli, identity } from './function'

export interface Chain<F extends HKTS> extends Apply<F> {
  chain<A, B, U = any, V = any>(f: Kleisli<F, A, B, U, V>, fa: HKT<A, U, V>[F]): HKT<B, U, V>[F]
}

export interface FantasyChain<F extends HKTS, A> extends FantasyApply<F, A> {
  chain<B, U = any, V = any>(f: Kleisli<F, A, B, U, V>): HKT<B, U, V>[F]
}

export function flatten<F extends HKTS>(
  chain: Chain<F>
): <A, U = any, V = any>(mma: HKT<HKT<A, U, V>[F], U, V>[F]) => HKT<A, U, V>[F] {
  return <A>(mma: HKT<HKT<A>[F]>[F]) => chain.chain<HKT<A>[F], A>(identity, mma)
}
