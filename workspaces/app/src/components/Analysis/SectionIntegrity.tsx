import { IBlueprint } from '@sepraisal/common'
import * as React from 'react'
import { cold } from 'react-hot-loader'
import Vega from 'react-vega'

import { createSmartFC, createStyles, IMyTheme } from '../../common/'
import { vegaSpecHeatmapLegend } from '../../common/vega'
import ValueCell from '../../components/Cell/ValueCell'
import HeaderCell from '../Cell/HeaderCell'
import MyBox from '../MyBox'
import MyBoxGroup from '../MyBoxGroup'
import MySection from '../MySection'
import SectionIntegrityHeatmap from './SectionIntegrityHeatmap'


const styles = (theme: IMyTheme) => createStyles({
    root: {
    },
})


interface IProps {
    bp: IBpProjectionRow
}


export default cold(createSmartFC(styles, __filename)<IProps>(({children, classes, theme, ...props}) => {
    const {bp} = props

    const {top, front, side} = bp.sbc.integrityPlanes
    const xRaw = Math.max(top[0].length, side[0].length, front[0].length) + 2
    const yRaw = Math.max(top.length, side.length, front.length) + 2
    const maxValues = {
        value: bp.sbc.blockIntegrity / 10,
        x: Math.max(xRaw, Math.round(yRaw * 268 / 151)),
        y: Math.max(yRaw, Math.round(xRaw * 151 / 268)),
    }

    const blockSize = bp.sbc.gridSize === 'Small' ? 0.5 : 2.5

    // TODO: Simplify Legend & MyBox-es.
    return (
        <MySection className={classes.root}>
            <MyBoxGroup height={3} width={2}>
                <MyBox width={2} flat>
                    <HeaderCell title='INTEGRITY'/>
                </MyBox>
                <MyBox width={2}>
                    {/* <ValueCell label={`Total Integrity`} value={bp.sbc.blockIntegrity} /> */}
                    <ValueCell label={`grid size`} value={bp.sbc.gridSize} />
                    <ValueCell label={`length (m)`} value={`${top[0].length * blockSize}`} />
                    <ValueCell label={`width (m)`} value={`${top.length * blockSize}`} />
                    <ValueCell label={`height (m)`} value={`${side.length * blockSize}`} />
                </MyBox>
            </MyBoxGroup>
            <MyBoxGroup height={3} width={1}>
                <MyBox>
                    <Vega
                        data={{
                            domain: {max: Math.sqrt(maxValues.value)},
                        }}
                        spec={vegaSpecHeatmapLegend}
                    />
                </MyBox>
            </MyBoxGroup>
            <MyBoxGroup height={3} width={3}>
                <MyBox width={3}>
                    <SectionIntegrityHeatmap maxValues={maxValues} plane={top} />
                </MyBox>
            </MyBoxGroup>
            <MyBoxGroup height={3} width={3}>
                <MyBox width={3}>
                    <SectionIntegrityHeatmap maxValues={maxValues} plane={front} />
                </MyBox>
            </MyBoxGroup>
            <MyBoxGroup height={3} width={3}>
                <MyBox width={3}>
                    <SectionIntegrityHeatmap maxValues={maxValues} plane={side} />
                </MyBox>
            </MyBoxGroup>
        </MySection>
    )
})) /* ============================================================================================================= */


type ProjectionCardSbc =
    | 'integrityPlanes'
    | 'blockIntegrity'
    | 'gridSize'

interface IBpProjectionRow {
    sbc: {[key in keyof Pick<IBlueprint.ISbc, ProjectionCardSbc>]: IBlueprint.ISbc[key]},
}