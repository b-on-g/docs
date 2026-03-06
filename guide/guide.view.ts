namespace $.$$ {

	export class $bog_docs_guide extends $.$bog_docs_guide {

		@$mol_mem
		lesson_index() {
			const arg = this.$.$mol_state_arg.value( 'lesson' )
			if ( arg ) return Math.max( 0, parseInt( arg ) - 1 )
			return 0
		}

		current_lesson_data() {
			return this.lessons()[ this.lesson_index() ] ?? this.lessons()[ 0 ]
		}

		override current_title() {
			return this.current_lesson_data().title
		}

		override current_explanation() {
			return this.current_lesson_data().explanation
		}

		override current_task() {
			return this.current_lesson_data().task
		}

		override current_initial_code() {
			return this.current_lesson_data().initial_code
		}

		override current_solution() {
			return this.current_lesson_data().solution
		}

		@$mol_mem
		override Current_lesson() {
			const obj = super.Current_lesson()
			obj.hints = () => this.current_lesson_data().hints
			return obj
		}

		lessons() {
			const d = '$'
			return [

				{
					title: 'Welcome to ' + d + 'mol',
					explanation: [
						'# Getting Started',
						'',
						'Welcome to the interactive ' + d + 'mol guide. In this lesson you will create your first component.',
						'',
						'## Module Structure',
						'',
						'Every ' + d + 'mol module lives in its own folder:',
						'',
						'```',
						'my/hello/',
						'    hello.view.tree    \u2014 component layout',
						'    hello.view.ts      \u2014 component logic',
						'    hello.view.css.ts  \u2014 component styles',
						'```',
						'',
						'## view.tree Basics',
						'',
						'Components are declared in `.view.tree` files:',
						'',
						'```',
						d + 'my_hello ' + d + 'mol_view',
						'    sub /',
						'        \\Hello World!',
						'```',
						'',
						'- Class name starts with `' + d + '` and matches the folder path',
						'- `' + d + 'mol_view` is the simplest base component',
						'- `sub /` defines the list of child elements',
					].join( '\n' ),
					task: 'Create a component `' + d + 'my_hello` extending `' + d + 'mol_view` that displays **Hello World!**.',
					initial_code: '',
					solution: [
						d + 'my_hello ' + d + 'mol_view',
						'\tsub /',
						'\t\t\\Hello World!',
					].join( '\n' ),
					hints: [
						'Start with: `' + d + 'my_hello ' + d + 'mol_view`',
						'Add `sub /` on the next line (indented with a tab)',
						'Add `\\Hello World!` as a child (indented with two tabs)',
					],
				},

				{
					title: 'view.tree Syntax',
					explanation: [
						'# view.tree Syntax',
						'',
						'**view.tree** is the declarative language for describing UI components in ' + d + 'mol.',
						'',
						'## Component Declaration',
						'',
						'A component starts with its class name and the base class:',
						'',
						'```',
						d + 'my_hello ' + d + 'mol_view',
						'    sub /',
						'        \\Hello World!',
						'```',
						'',
						'- `' + d + 'my_hello` \u2014 your component class name',
						'- `' + d + 'mol_view` \u2014 base class to extend',
						'- `sub /` \u2014 list of child elements',
						'- `\\Hello World!` \u2014 raw text content',
						'',
						'## Nesting Components',
						'',
						'Use `<=` to declare named sub-components:',
						'',
						'```',
						d + 'my_app ' + d + 'mol_view',
						'    sub /',
						'        <= Title ' + d + 'mol_view',
						'            sub / \\Welcome',
						'        <= Button ' + d + 'mol_button_minor',
						'            sub / \\Click me',
						'```',
						'',
						'Each `<= Name ' + d + 'Component` creates a named property that returns a component instance.',
						'This is how you compose complex UIs from simple building blocks.',
						'',
						'## Indentation',
						'',
						'view.tree uses **tab indentation** to express nesting. Each nested level adds one more tab.',
					].join( '\n' ),
					task: [
						'Add a `' + d + 'mol_button_minor` named **Action** inside `' + d + 'my_app` below the existing text.',
						'',
						'The button should display text **"Click me"**.',
						'',
						'Use `<=` binding syntax to declare the button as a named property.',
					].join( '\n' ),
					initial_code: [
						d + 'my_app ' + d + 'mol_view',
						'\tsub /',
						'\t\t\\Click the button below',
					].join( '\n' ),
					solution: [
						d + 'my_app ' + d + 'mol_view',
						'\tsub /',
						'\t\t\\Click the button below',
						'\t\t<= Action ' + d + 'mol_button_minor',
						'\t\t\tsub /',
						'\t\t\t\t\\Click me',
					].join( '\n' ),
					hints: [
						'Use `<= Action ' + d + 'mol_button_minor` to add a named sub-component',
						'The button needs its own `sub /` with `\\Click me` inside',
						'Align `<= Action` at the same indent level as `\\Click the button below`',
					],
				},

				{
					title: 'Bindings',
					explanation: [
						'# Bindings in view.tree',
						'',
						'Bindings connect properties between components. There are three types:',
						'',
						'## One-way binding `<=`',
						'',
						'Reads a value from a property. The child **receives** data from the parent:',
						'',
						'```',
						d + 'my_app ' + d + 'mol_view',
						'    sub /',
						'        <= Title ' + d + 'mol_view',
						'            sub / <= title \\Hello',
						'```',
						'',
						'Here `<= title` reads the `title` property. The component displays its value.',
						'',
						'## Two-way binding `<=>`',
						'',
						'Creates a **synchronized** link between two properties. Changes flow in both directions:',
						'',
						'```',
						d + 'my_form ' + d + 'mol_view',
						'    sub /',
						'        <= Name_input ' + d + 'mol_string',
						'            value? <=> name? \\',
						'```',
						'',
						'When the user types in `Name_input`, the `name` property updates. If `name` changes elsewhere, the input updates too.',
						'',
						'The `?` after the property name means it accepts a new value (is writable).',
						'',
						'## Output binding `=>`',
						'',
						'Passes a property **out** to the parent. The child **provides** data:',
						'',
						'```',
						d + 'my_page ' + d + 'mol_page',
						'    title <= page_title \\My Page',
						'    body /',
						'        <= Content ' + d + 'mol_view',
						'            sub / <= page_title',
						'```',
						'',
						'## Common Pattern',
						'',
						'A typical pattern is connecting an input field to a label so they share the same value:',
						'',
						'```',
						d + 'my_greeting ' + d + 'mol_view',
						'    sub /',
						'        <= Input ' + d + 'mol_string',
						'            value? <=> user_name? \\World',
						'        <= Output ' + d + 'mol_view',
						'            sub / <= greeting \\',
						'```',
						'',
						'The `user_name` property is shared between the input and can be used elsewhere.',
					].join( '\n' ),
					task: [
						'Create a component `' + d + 'my_form` extending `' + d + 'mol_view` with:',
						'',
						'1. A `' + d + 'mol_string` input named **Name_input** with two-way binding `<=>` to property `name?` (default empty `\\`)',
						'2. A `' + d + 'mol_view` named **Greeting** that displays the `name` property via `<= name`',
						'',
						'Both should be children in `sub /`.',
					].join( '\n' ),
					initial_code: [
						d + 'my_form ' + d + 'mol_view',
						'\tsub /',
						'\t\t<= Name_input ' + d + 'mol_string',
						'\t\t<= Greeting ' + d + 'mol_view',
					].join( '\n' ),
					solution: [
						d + 'my_form ' + d + 'mol_view',
						'\tsub /',
						'\t\t<= Name_input ' + d + 'mol_string',
						'\t\t\tvalue? <=> name? \\',
						'\t\t<= Greeting ' + d + 'mol_view',
						'\t\t\tsub / <= name',
					].join( '\n' ),
					hints: [
						'Add `value? <=> name? \\` inside Name_input to create a two-way binding',
						'Add `sub / <= name` inside Greeting to read the name property',
						'The `?` after property names marks them as writable (accepting new values)',
					],
				},

			]
		}

	}

}
