import * as React from 'react'
import { hot } from 'react-hot-loader/root'

import { createSmartFC, createStyles, IMyTheme } from 'src/common'
import Search from 'src/components/Search'
import DefaultLayout from 'src/layouts/DefaultLayout'

import Cards from './Cards'
import Filter from './Filter'
import LoadMore from './LoadMore'


const styles = (theme: IMyTheme) => createStyles({
    root: {
    },

})


interface IProps {
}


export default hot(createSmartFC(styles, __filename)<IProps>(({children, classes, theme, ...props}) => {

    return (
        <DefaultLayout className={classes.root} aside={<Filter />} asideTitle='Browse'>
            <Search />
            <Cards />
            <LoadMore />
        </DefaultLayout>
    )
})) /* ============================================================================================================= */


const drawerWidth = 360
