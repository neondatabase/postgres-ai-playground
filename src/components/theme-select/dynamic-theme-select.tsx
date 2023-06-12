import dynamic from 'next/dynamic'

const DynamicThemeSelect = dynamic(() => import('@/components/theme-select/theme-select'), {
    ssr: true,
})

export default DynamicThemeSelect