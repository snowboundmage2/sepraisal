import { IBlueprint } from '@sepraisal/common'
import * as React from 'react'
import { hot } from 'react-hot-loader/root'

import { createSmartFC, createStyles, formatDecimal, IMyTheme } from '../../common/'
import ValueCell from '../../components/Cell/ValueCell'
import HeaderCell from '../Cell/HeaderCell'
import MyBox from '../MyBox'
import MyBoxGroup from '../MyBoxGroup'
import MySection from '../MySection'


const styles = (theme: IMyTheme) => createStyles({
    root: {
    },
})


interface IProps {
    bp: IBpProjectionRow
}


export default hot(createSmartFC(styles, __filename)<IProps>(({children, classes, theme, ...props}) => {
    const sbc = props.bp.sbc
    const mass = sbc.blockMass

    const warheads = {
        small: sbc.blocks['Warhead/SmallWarhead'] ?? 0,
        large: sbc.blocks['Warhead/LargeWarhead'] ?? 0,
    }
    const fixed = {
        smallGatling: sbc.blocks['SmallGatlingGun/'] ?? 0,
        smallMissile: sbc.blocks['SmallMissileLauncher/'] ?? 0,
        largeMissile: sbc.blocks['SmallMissileLauncher/LargeMissileLauncher'] ?? 0,
        smallMissileReload: sbc.blocks['SmallMissileLauncherReload/SmallRocketLauncherReload'] ?? 0,
    }
    const turret = {
        smallGatling: sbc.blocks['LargeGatlingTurret/SmallGatlingTurret'] ?? 0,
        largeGatling: sbc.blocks['LargeGatlingTurret/'] ?? 0,
        smallMissile: sbc.blocks['LargeMissileTurret/SmallMissileTurret'] ?? 0,
        largeMissile: sbc.blocks['LargeMissileTurret/'] ?? 0,
        interior: sbc.blocks['InteriorTurret/LargeInteriorTurret'] ?? 0,
    }

    return (
        <MySection className={classes.root}>
            <MyBoxGroup height={2} width={2}>
                <MyBox width={2} flat>
                    <HeaderCell title='OFFENSIVE' />
                </MyBox>
                <MyBox width={2}>
                    <ValueCell label={`warheads`} value={(warheads.small + warheads.large) || '-'} />
                    {/* <ValueCell label={`PMM`} value={'?'} /> */}
                    {/* <ValueCell label={`gravity gun`} value={'?'} /> */}
                </MyBox>
            </MyBoxGroup>
            <MyBoxGroup height={2} width={4}>
                <MyBox width={4}>
                    <ValueCell label={`fixed DPS`} value={formatDecimal(getFixedDPS(sbc.blocks))} />
                    <ValueCell label={`gatling`} value={fixed.smallGatling || '-'} />
                    <ValueCell label={`rocket`} value={(fixed.smallMissile + fixed.largeMissile) || '-'} />
                    <ValueCell label={`rel. rocket`} value={fixed.smallMissileReload || '-'} />
                </MyBox>
                <MyBox width={4}>
                    <ValueCell label={`turret DPS`} value={formatDecimal(getTurretDPS(sbc.blocks))} />
                    <ValueCell label={`gatling`} value={(turret.smallGatling + turret.largeGatling) || '-'} />
                    <ValueCell label={`rocket`} value={(turret.smallMissile + fixed.largeMissile) || '-'} />
                    <ValueCell label={`interior`} value={turret.interior || '-'} />
                </MyBox>
            </MyBoxGroup>
        </MySection>
    )
})) /* ============================================================================================================= */


type ProjectionCardSbc =
    | 'blocks'
    | 'blockMass'

interface IBpProjectionRow {
    sbc: {[key in keyof Pick<IBlueprint.ISbc, ProjectionCardSbc>]: IBlueprint.ISbc[key]},
}

const getFixedDPS = (blocks: IBpProjectionRow['sbc']['blocks']) => {
    return 0
        + (150 * 700/60 * (blocks['SmallGatlingGun/'] ?? 0))
        + (500 * 60 /60 * (blocks['SmallMissileLauncher/'] ?? 0))
        + (500 * 60 /60 * (blocks['SmallMissileLauncherReload/SmallRocketLauncherReload'] ?? 0))
        + (500 * 120/60 * (blocks['SmallMissileLauncher/LargeMissileLauncher'] ?? 0))
}

const getTurretDPS = (blocks: IBpProjectionRow['sbc']['blocks']) => {
    return 0
        + (60  * 300/60 * (blocks['LargeGatlingTurret/SmallGatlingTurret'] ?? 0))
        + (150 * 600/60 * (blocks['LargeGatlingTurret/'] ?? 0))
        + (500 *  90/60 * (blocks['LargeMissileTurret/SmallMissileTurret'] ?? 0))
        + (500 *  90/60 * (blocks['LargeMissileTurret/'] ?? 0))
        + (30  * 600/60 * (blocks['InteriorTurret/LargeInteriorTurret'] ?? 0))
}