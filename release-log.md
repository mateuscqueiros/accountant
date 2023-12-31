## Other changes across versions

# 0.4.4 -> 0.4.5

- Refactor: BillsDataItem -> Transaction. Change in type name across the app.
- Refactor: Move Categories from inside Config to its own component.
- Refactor: TableHeader Item in Categories and changes in icon behavior when hovered.

- Feat: Add favicons.
- Feat: Change theme logic to parse mantine colors.
- Feat: Change NavIcons colors.

- Refactor: Better favicons.
- Refactor: Categories code and logic.
- Fix: color bugs on Config Nav.

- Performance: Dynamic imports for most pages.
- Experimental: Local storage Mantine Hook.
- Refactor: Change deletion modal in Item Modal.
- Fix: items in main screen not updating when data changed.
- Fix: Context not resolving in categories. This prevented items from being updated or created.
- Fix: Web manifest fixes.

- Feat: mocks for Transactions.
- Fix: Bugs on statistics calcs.
- Feat: Feedback when an item is activated or not. Activate it directly on "Actions".
- Feat: Actions components.
- Fix: Filter itens calculations.
- Fix: Names of groups in filter.

# 0.4.5 -> 0.5.0

- Fix: Items not updating on categories view.
- Refactor: Make ConfigNav more dynamic.
- Feat: Wallet page first appearance.
- Feat: Cor do tema: Indigo.
- Refactor: Responsive.
- Feat: Wallets Page, Modal and Tabs.
- Feat: Center items in ConfigContent.

- Feat: Add input and brand icons.
- Feat: Visualize brand items.
- Feat: Show items for each wallet. Wallet items now are editable and have statistics.
- Feat: Add scroll to items visualization in categories and wallets.

- Refactor: FilterData - data to display is customizable as well as filter options.
- Change: Change input colors.
- Feat: Filter data in categories.
- Feat: Delete wallet.
- Feat: Routes in categories and wallets pages are now filtered by slugs.
- Refactor: FilterData is more dynamic.
