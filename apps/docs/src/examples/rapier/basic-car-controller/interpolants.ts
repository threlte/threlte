export function interpolatePower(t: number) {
	const kSTS = 11
	const kSSS = 1 / (kSTS - 1)
	const map = (n: number, t: number, S: number, r: number, u: number) =>
		((n - t) * (u - r)) / (S - t) + r
	const A = (n: number, t: number) => 1 - 3 * t + 3 * n
	const B = (n: number, t: number) => 3 * t - 6 * n
	const C = (n: number) => 3 * n
	const cB = (n: number, t: number, S: number) => ((A(t, S) * n + B(t, S)) * n + C(t)) * n
	const gS = (n: number, t: number, S: number) => 3 * A(t, S) * n * n + 2 * B(t, S) * n + C(t)
	const bS = (n: number, t: number, S: number, r: number, u: number) => {
		let c,
			o,
			e = 0
		do {
			;(c = cB((o = t + (S - t) / 2), r, u) - n) > 0 ? (S = o) : (t = o)
		} while (Math.abs(c) > 1e-7 && ++e < 10)
		return o
	}
	const nRI = (n: number, t: number, S: number, r: number) => {
		for (let u = 0; u < 4; ++u) {
			const u = gS(t, S, r)
			if (0 === u) return t
			t -= (cB(t, S, r) - n) / u
		}
		return t
	}
	const b = (n: number, t: number, S: number, r: number) => {
		if (!(0 <= n && n <= 1 && 0 <= S && S <= 1)) throw new Error('Error resolving bezier')
		const u = new Float32Array(kSTS)
		if (n !== t || S !== r) for (let t = 0; t < kSTS; ++t) u[t] = cB(t * kSSS, n, S)
		return (c: number) =>
			n === t && S === r
				? c
				: 0 === c || 1 === c
				? c
				: cB(
						(function (t) {
							let r = 0,
								c = 1
							const o = kSTS - 1
							for (; c !== o && u[c] <= t; ++c) r += kSSS
							const e = r + ((t - u[--c]) / (u[c + 1] - u[c])) * kSSS,
								f = gS(e, n, S)
							return f >= 0.001 ? nRI(t, e, n, S) : 0 === f ? e : bS(t, r, r + kSSS, n, S)
						})(c),
						t,
						r
				  )
	}

	if (t < 0.33486842105263154)
		return map(
			b(
				0.5631376682072522,
				0.19445029983083337,
				0.5032432135963265,
				0.6691757133207975
			)(((t - 0) * (1 - 0)) / (0.33486842105263154 - 0) + 0 * 2),
			0,
			1,
			0.03026315789473685,
			0.3960526315789473
		)
	if (t < 0.7756578947368421)
		return map(
			b(
				0.37738687205890986,
				0.5181360658975671,
				0.7093424709678383,
				0.5217585344647981
			)(((t - 0.33486842105263154) * (1 - 0)) / (0.7756578947368421 - 0.33486842105263154) + 0 * 2),
			0,
			1,
			0.3960526315789473,
			0.629605263157895
		)
	return map(
		b(
			0.571086640620376,
			0.3015554534014153,
			1,
			1
		)(((t - 0.7756578947368421) * (1 - 0)) / (1 - 0.7756578947368421) + 0 * 2),
		0,
		1,
		0.629605263157895,
		1
	)
}
