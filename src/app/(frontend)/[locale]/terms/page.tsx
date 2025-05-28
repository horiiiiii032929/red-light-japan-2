import { Breadcrumb, BreadcrumbLink, BreadcrumbList, BreadcrumbItem, BreadcrumbSeparator } from '@/components/ui/breadcrumb'
import { getTranslations } from 'next-intl/server'
import { TypedLocale } from 'payload'

interface Props {
  params: Promise<{
    locale: TypedLocale
  }>
}

const ja = `
本利用規約（以下「本規約」といいます）は、NightLife Japan（以下「当社」といいます）が提供するウェブサイトおよび関連サービス（以下「本サイト」といいます）の利用条件を定めるものです。本サイトを利用するすべてのユーザーは、本規約に同意のうえご利用ください。

第1条（定義）
「ユーザー」とは、本サイトを閲覧または利用するすべての個人および法人をいいます。
「会員」とは、本サイト所定の手続により会員登録を行い、アカウントを保有するユーザーをいいます。
「掲載店舗」とは、キャバクラ、クラブ、バーその他、風俗営業等の規制及び業務の適正化等に関する法律（以下「風営法」といいます）に基づく営業を行う施設をいいます。

第2条（会員登録および資格）
一部のサービス（口コミ投稿・お気に入り登録等）の利用には、無料または有料の会員登録が必要です。
会員登録を希望する者は、以下の条件をすべて満たす必要があります：
 (1) 満18歳以上であること（風営法に基づく年齢制限）。
 (2) 高等学校在学中でないこと。
 (3) 当社が必要と認めた場合、本人確認書類を提出すること。
会員は、自己のアカウントを第三者に譲渡・貸与・売買・相続その他の形で移転してはなりません。

第3条（禁止事項）
ユーザーは、本サイトの利用にあたり、以下の行為を行ってはなりません：
風営法その他の法令に違反する行為、またはそのおそれのある行為。
18歳未満の者を対象とした誘導、もしくはそれを暗示・助長する行為。
売春、買春、斡旋その他これらに類する行為。
無許可の営業施設に関する情報掲載や広告行為。
虚偽情報の投稿、掲載店舗や従業員への誹謗中傷、名誉毀損行為。
自作自演による口コミ投稿や評価操作行為。
他人のアカウントを無断で使用する行為。
本サイトに対する不正アクセス、DDoS攻撃、脆弱性の悪用その他の妨害行為。

第4条（有料サービスおよび課金）
本サイトでは、プレミアム会員、広告掲載等の有料サービスを提供することがあります。
有料サービスの利用料金は、StripeやPayPalなどによる事前決済とし、特段の表示がない限り税込価格とします。
デジタルコンテンツの性質上、原則として返金は行いません。ただし、決済日から7日以内にご連絡をいただいた場合は、当社の裁量により個別に対応します。
不正利用が確認された場合、当社は当該ユーザーに対し損害賠償を請求できるものとします。
有料プランは自動更新契約とし、ユーザーが所定の手続により更新日前日までに解約しない限り、契約は自動的に更新されます。
解約は、マイページの「契約管理」画面から行ってください。

第5条（免責事項）
当社は、掲載店舗の合法性、安全性、提供サービスの品質、営業時間、料金体系等について一切の保証を行いません。
ユーザーと掲載店舗との間で発生したトラブル（例：料金請求、接客内容等）について、当社は一切の責任を負いません。
掲載情報は、掲載店舗の都合により予告なく変更される場合があります。

第6条（著作権・投稿内容の利用）
本サイトに掲載されるコンテンツ（文章、画像、動画、デザイン、プログラム等）の著作権は、当社または原権利者に帰属します。
ユーザーが投稿した口コミ・画像等の情報について、当社は非独占的に編集・複製・翻訳・転載・配信等を行う権利を有するものとします。
ユーザーは、前項の利用について著作者人格権を行使しないものとします。

第7条（退会および違反措置）
ユーザーは、当社所定の手続により、いつでも退会できます。
退会後も、当社はユーザーの投稿内容を合理的な範囲で保持・表示することができます。
以下の場合、当社は事前の通知なく、アカウント停止、投稿削除、強制退会等の措置を講じることができます：
 (1) 本規約または法令に違反する行為が確認された場合。
 (2) 登録情報に虚偽があることが判明した場合。
 (3) アカウントを第三者に譲渡または貸与した場合。
投稿削除を希望される場合は、当社指定の問い合わせフォームより申請してください。当社の裁量により、合理的と判断した場合のみ削除対応を行います。

第8条（準拠法および管轄）
本規約の準拠法は日本法とし、本サイトに関連する一切の紛争については、当社本店所在地を管轄する地方裁判所を第一審の専属的合意管轄裁判所とします。

第9条（投稿モニタリングおよびログ管理）
当社は、本サイト上の投稿をモニタリングし、違反行為の抑止および削除措置を講じることがあります。
違反が疑われる場合、当社は当該投稿の削除またはアカウントの利用制限を行うことがあります。
当社は、ユーザーの利用ログ（IPアドレス、アクセス日時等）を、違反調査および法的義務対応の目的に限定して保存・利用することがあります。

附則：プライバシーポリシー（抜粋）
収集する情報
Vercel Analyticsを通じた匿名アクセス情報（IPアドレス、ブラウザ情報等）
会員登録時のメールアドレス、生年月日（年齢確認目的）
利用目的
サービス改善、人気店舗の分析
18歳未満ユーザーのアクセス制限（風営法対応）
第三者提供
原則として第三者への提供は行いません。ただし、法令に基づき警察・裁判所等から開示要請があった場合にはこれに応じます。
情報の安全管理
SSL暗号化通信、アクセス権限管理等により、適切な情報管理措置を講じています。
`

const en = `
Terms of Use for NightLife Japan

These Terms of Use ("Terms") set forth the conditions for using the website and related services ("Site") provided by NightLife Japan ("Company"). All users of this Site are deemed to have agreed to these Terms.

Article 1 (Definitions)
- "User" refers to any individual or legal entity who accesses or uses this Site.
- "Member" refers to a user who has completed the registration process and holds an account.
- "Listed Establishment" refers to nightclubs, cabarets, bars, and similar businesses operated in accordance with Japan’s Act on Control and Improvement of Amusement Business, etc. ("Fueiho").

Article 2 (Membership Registration and Eligibility)
- Some services (e.g., posting reviews, saving favorites) require free or paid membership registration.
- To register, applicants must:
  (1) Be at least 18 years old (as per Fueiho).
  (2) Not be enrolled in high school.
  (3) Provide identity verification if requested by the Company.
- Accounts may not be transferred, sold, loaned, or inherited to/from third parties.

Article 3 (Prohibited Conduct)
Users must not:
- Violate Fueiho or other applicable laws.
- Direct or imply services toward persons under 18.
- Solicit or facilitate prostitution or related acts.
- Promote unlicensed businesses.
- Post false information, defame listed establishments or their staff.
- Submit fake reviews or manipulate ratings.
- Use others’ accounts without authorization.
- Conduct DDoS attacks or interfere with the Site’s operation.

Article 4 (Paid Services and Billing)
- Paid services such as premium membership and ad listings may be offered.
- Payments are made in advance via Stripe, PayPal, etc., including taxes unless otherwise stated.
- No refunds will be issued due to the nature of digital content, except when contacted within 7 days of payment, at our discretion.
- Users found committing fraud may be liable for damages.
- Plans automatically renew unless cancelled by the day before the next billing cycle.
- Cancellation must be made via the "Account Settings" page.

Article 5 (Disclaimer)
- The Company provides no warranties regarding legality, safety, or service quality of listed establishments.
- The Company is not responsible for disputes (e.g., billing or conduct) between users and listed establishments.
- Listing details may change without notice.

Article 6 (Copyright and User-Generated Content)
- All content on the Site is copyrighted by the Company or rightful owners.
- User-submitted reviews, images, etc., may be edited, reproduced, translated, distributed, and reused non-exclusively by the Company.
- Users agree not to exercise moral rights regarding submitted content.

Article 7 (Withdrawal and Violations)
- Users may withdraw their membership anytime via the prescribed procedure.
- Posted content may remain visible even after withdrawal.
- The Company may suspend or delete accounts without prior notice for:
  (1) Violations of these Terms or laws.
  (2) False registration information.
  (3) Unauthorized transfer of accounts.
- Requests for content deletion can be submitted through the inquiry form and will be reviewed case-by-case.

Article 8 (Governing Law and Jurisdiction)
These Terms are governed by Japanese law. Any disputes shall be subject to the exclusive jurisdiction of the District Court having jurisdiction over the Company's headquarters.

Article 9 (Monitoring and Logs)
- The Company monitors user submissions to enforce these Terms.
- Violating content may be deleted and accounts restricted.
- Logs (e.g., IP address, access time) are retained solely for compliance and investigation purposes.

Appendix: Privacy Policy (Extract)
Collected Information:
- Anonymous access data via Vercel Analytics (e.g., IP address, browser).
- Email address and date of birth at registration (for age verification).

Purposes:
- Service improvements and trend analysis.
- Access restriction for users under 18 (Fueiho compliance).

Third-Party Sharing:
- Not shared unless required by law, court, or law enforcement.

Security Measures:
- SSL encryption and access control are implemented appropriately.
`

const zh = `
NightLife Japan 使用条款

本使用条款（以下简称“本条款”）规定了由 NightLife Japan（以下简称“本公司”）所提供的网站及相关服务（以下简称“本网站”）的使用条件。所有使用本网站的用户均视为已同意本条款。

第1条（定义）
- “用户”指所有访问或使用本网站的个人或法人。
- “会员”指通过本网站的注册程序注册并拥有账户的用户。
- “登记店铺”指根据《风俗营业等相关法规》（以下简称“风营法”）合法运营的夜总会、俱乐部、酒吧等场所。

第2条（会员注册与资格）
- 部分服务（如点评、收藏）需要免费或付费注册。
- 申请注册的用户须满足以下条件：
  (1) 年满18岁（依风营法规定）。
  (2) 不得为在读高中生。
  (3) 如本公司要求，必须提交身份证明文件。
- 会员账户不得转让、出售、出租或以其他方式交由第三方使用。

第3条（禁止行为）
用户不得实施以下行为：
- 违反风营法及其他法律法规的行为，或可能违反的行为。
- 引导或暗示未满18岁人士使用服务。
- 招募、斡旋或类似的卖淫行为。
- 发布未经许可的营业场所广告信息。
- 虚假信息发布，或对店铺及其员工的诽谤中伤。
- 虚构评价或操控评分。
- 未经授权使用他人账户。
- 对本网站发起DDoS攻击、不正当访问或其他干扰行为。

第4条（付费服务与收费）
- 本网站提供高级会员、广告展示等付费服务。
- 所有服务均须通过Stripe、PayPal等方式预付款，价格包含税金（若无特别说明）。
- 由于数字内容的特性，原则上不予退款；如在付款7天内提出申请，可由本公司酌情处理。
- 若发现不正当使用，本公司有权要求用户赔偿损失。
- 所有付费服务为自动续订，除非用户在下次计费日前取消，否则将自动续约。
- 用户可通过“账户管理”页面进行取消。

第5条（免责声明）
- 本公司不对登记店铺的合法性、安全性、服务品质等做出任何保证。
- 对于用户与店铺间发生的任何纠纷（例如：费用争议、服务内容等），本公司概不负责。
- 店铺信息（如营业时间、价格）可能会因店铺自身情况而变更，恕不另行通知。

第6条（版权与用户内容）
- 本网站所有内容（文字、图片、设计、程序等）的版权归本公司或原始权利人所有。
- 用户所提交的点评、图片等内容，本公司拥有非独占性的编辑、复制、翻译、传播及再次利用权。
- 用户同意不主张任何著作人格权。

第7条（退会与违规处理）
- 用户可依照本公司规定的程序随时退会。
- 退会后，其先前发布的内容可能仍被保留展示。
- 如发生以下情况，本公司可无需事先通知而限制或终止用户账户使用，删除内容：
  (1) 违反本条款或法律法规。
  (2) 提供虚假注册信息。
  (3) 非法转让账户。
- 如需删除内容，请通过本公司提供的联系表格提交申请。是否删除由本公司酌情决定。

第8条（适用法律与管辖）
本条款适用日本法律，若发生争议，由本公司总部所在地的日本地方法院作为第一审的专属管辖法院。

第9条（监控与日志管理）
- 本公司会对用户发布内容进行监控，以确保其合规性。
- 如发现违规内容，将予以删除并可能限制账户使用。
- 用户的使用日志（IP地址、访问时间等）将仅用于合规调查和法律义务目的。

附则：隐私政策摘要
收集信息：
- 通过 Vercel Analytics 收集的匿名访问信息（IP地址、浏览器等）
- 注册时提交的邮箱地址和出生日期（用于年龄验证）

使用目的：
- 服务改进与店铺受欢迎度分析
- 限制未满18岁用户访问（风营法合规）

第三方共享：
- 原则上不共享用户信息，但在司法机关、警察等提出正式法律请求时会依法提供。

安全管理：
- 采用SSL加密通信与访问权限控制，确保信息安全。
`

const ko = `

`

export default async function TermsPage({ params }: Props) {
  const { locale } = await params
  const t = await getTranslations()

  const terms = {
    ja,
    en,
    zh,
    ko
  }

  return (
    <div className="container-wrapper">
      <main className="container py-3 md:py-6">
        <Breadcrumb className="mb-2 md:mb-3 pb-1">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">{t('breadcrumbs.home')}</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/terms">{t('footer.terms')}</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <h1 className="text-2xl font-bold tracking-tight md:text-3xl">{t('footer.terms')}</h1>

        <section className="whitespace-pre-wrap text-">
          {terms[locale]}
        </section>

      </main>
    </div>
  )
}