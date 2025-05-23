import { getPayload } from "payload"
import config from "@/payload.config"

import { Fragment } from "react"
import { FormBlock } from "@/components/Form/Component"
import { VerticalPadding } from "@/components/VerticalPadding"
import { toKebabCase } from "@/utilities/toKebabCase"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { getTranslations } from "next-intl/server"


const blockComponents = {
  formBlock: FormBlock,
}

export default async function ContactPage() {
  const payload = await getPayload({ config })
  const t = await getTranslations()
  const pageRes = await payload.find({
    collection: 'pages',
    locale: 'ja',
    draft: false,
    limit: 1,
    overrideAccess: false,
    where: {
      slug: {
        equals: 'contact',
      },
    },
  })

  const page = pageRes?.docs?.[0]

  if (!page) {
    return <div>Page not found</div>
  }

  const blocks = page.layout

  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0

  return (
    <div className="container-wrapper">
      <main className="container py-3 md:py-6">
        <Breadcrumb className="mb-2 md:mb-3 overflow-x-auto whitespace-nowrap pb-1">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">{t('breadcrumbs.home')}</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/contact">{t('breadcrumbs.contact')}</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="mb-4 md:mb-6">
          <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
            {t('contact-page.title')}
          </h1>
          <p className="mt-1 text-xs text-muted-foreground md:mt-2 md:text-sm">
            {t('contact-page.description')}
          </p>
        </div>


        <Fragment>
          {blocks.map((block, index) => {
            const { blockName, blockType, form } = block

            const isFormBlock = blockType === 'formBlock'
            // eslint-disable-next-line no-empty
            {
            }
            // @ts-expect-error: Form is not defined
            const formID: string = isFormBlock && form && (typeof form === 'string' ? form : form.id)

            if (blockType && blockType in blockComponents) {
              const Block = blockComponents[blockType]

              return (
                <VerticalPadding bottom="small" key={isFormBlock ? formID : index} top="small">
                  {/*@ts-expect-error: Block type is dynamically determined */}
                  <Block id={toKebabCase(blockName)} {...block} />
                </VerticalPadding>
              )
            }
            return null
          })}
        </Fragment>
      </main>
    </div>
  )
}