import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { useTranslation } from 'react-i18next'
import { tween, wait, easings } from './animation'
import './style/Hero.css'

interface LineState {
  opacity: number
  translateY: number
}

interface NameState {
  opacity: number
  translateY: number
}

export function Hero() {
  const { t } = useTranslation()

  const lines = t("hero.lines", { returnObjects: true }) as Array<{
    keyword: string
    text: string
  }>

  const l1Ref = useRef<HTMLParagraphElement>(null)
  const l2Ref = useRef<HTMLParagraphElement>(null)
  const l3Ref = useRef<HTMLParagraphElement>(null)

  const [phaseOneOpacity, setPhaseOneOpacity] = useState(1)

  const [l1, setL1] = useState<LineState>({ opacity: 0, translateY: 30 })
  const [l2, setL2] = useState<LineState>({ opacity: 0, translateY: 30 })
  const [l3, setL3] = useState<LineState>({ opacity: 0, translateY: 30 })

  const [finalOpacity, setFinalOpacity] = useState(0)
  const [bridgeOpacity, setBridgeOpacity] = useState(0)
  const [nameBlockOpacity, setNameBlockOpacity] = useState(0)
  const [dividerWidth, setDividerWidth] = useState(0)
  const [nameState, setNameState] = useState<NameState>({ opacity: 0, translateY: 16 })
  const [roleOpacity, setRoleOpacity] = useState(0)
  const [cornerOpacity] = useState(0)

  const ran = useRef(false)

  useEffect(() => {
    if (ran.current) return
    ran.current = true
    document.fonts.ready.then(runSequence)
  }, [])

  async function runSequence() {
    await wait(400)

    const setters = [setL1, setL2, setL3]

    for (let i = 0; i < setters.length; i++) {
      if (i > 0) await wait(150)

      const set = setters[i]

      tween(700, easings.outExpo, (t) => {
        set({ opacity: t, translateY: 30 * (1 - t) })
      })

      await wait(200)
    }

    await wait(2000)

    const r1 = l1Ref.current?.getBoundingClientRect()
    const r2 = l2Ref.current?.getBoundingClientRect()
    const r3 = l3Ref.current?.getBoundingClientRect()

    const mid = r2 ? r2.top + r2.height / 2 : 0
    const d1 = r1 ? mid - (r1.top + r1.height / 2) : 0
    const d3 = r3 ? mid - (r3.top + r3.height / 2) : 0

    setFinalOpacity(1)
    setBridgeOpacity(0)

    await tween(850, easings.inOutQuart, (t, rawT) => {
      const lineOpacity = 1 - Math.max(0, (rawT - 0.35) / 0.65)
      const bridgeProg = Math.max(0, (rawT - 0.4) / 0.6)

      setL1({ opacity: lineOpacity, translateY: d1 * t })
      setL2({ opacity: lineOpacity, translateY: 0 })
      setL3({ opacity: lineOpacity, translateY: d3 * t })

      setBridgeOpacity(bridgeProg)
    })

    setPhaseOneOpacity(0)

    await wait(1800)

    setNameBlockOpacity(1)

    tween(650, easings.outExpo, (t) => setDividerWidth(120 * t))

    await wait(100)

    await tween(400, easings.outQuart, (t) => {
      setNameState({ opacity: t, translateY: 0 })
    })

    tween(500, easings.outExpo, (t) => setRoleOpacity(t))
  }

  const lineStyle = (s: LineState): CSSProperties => ({
    opacity: s.opacity,
    transform: `translateY(${s.translateY}px)`,
  })

  return (
    <div className="hero">

      {/* Phase 1 */}
      <div className="phase-one" style={{ opacity: phaseOneOpacity }}>

        <p ref={l1Ref} className="line" style={lineStyle(l1)}>
          <span className="keyword">{lines[0].keyword}</span> {lines[0].text}
        </p>

        <p ref={l2Ref} className="line" style={lineStyle(l2)}>
          <span className="keyword">{lines[1].keyword}</span> {lines[1].text}
        </p>

        <p ref={l3Ref} className="line" style={lineStyle(l3)}>
          <span className="keyword">{lines[2].keyword}</span> {lines[2].text}
        </p>

      </div>

      {/* Phase final */}
      <div className="phase-final" style={{ opacity: finalOpacity }}>

        <p className="bridge" style={{ opacity: bridgeOpacity }}>
          {t("hero.bridge")}
        </p>

        <div className="name-block" style={{ opacity: nameBlockOpacity }}>
          <div className="divider" style={{ width: dividerWidth }} />

          <h1
            className="name"
            style={{ opacity: nameState.opacity, transform: `translateY(${nameState.translateY}px)` }}
          >
            {t("hero.name")}
          </h1>

          <p className="role" style={{ opacity: roleOpacity }}>
            {t("hero.role")}
          </p>
        </div>

      </div>
    </div>
  )
}