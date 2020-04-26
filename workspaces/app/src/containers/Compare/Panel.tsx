import * as React from 'react'
import { hot } from 'react-hot-loader/root'

import { Divider } from '@material-ui/core'

import { createSmartFC, createStyles, IMyTheme } from '../../common'
import PanelFavorites from './PanelFavorites'
import PanelRecent from './PanelRecent'
import PanelUploads from './PanelUploads'

const styles = (theme: IMyTheme) => createStyles({
    root: {
        backgroundColor: '#FFF',
        position: 'relative',
    },

    list: {
        width: '100%',
    },
    subpanel: {
    }
})


interface IProps {
}


export default hot(createSmartFC(styles, __filename)<IProps>(({children, classes, theme, ...props}) => {

    return (
        <div className={classes.root}>
            <PanelUploads classes={{root: classes.subpanel, list: classes.list}} />
            <Divider />
            <PanelFavorites classes={{root: classes.subpanel, list: classes.list}} />
            <Divider />
            <PanelRecent classes={{root: classes.subpanel, list: classes.list}} />
        </div>
    )
})) /* ============================================================================================================= */
