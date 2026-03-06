namespace $.$$ {

	export class $bog_docs_play extends $.$bog_docs_play {

		@$mol_mem
		source( next?: string ) {
			return next ?? this.preset_code_hello()
		}

		preset_code_hello() {
			const d = '$'
			return [
				d + 'my_hello ' + d + 'mol_view',
				'\tsub /',
				'\t\t\\Hello World!',
			].join( '\n' )
		}

		preset_code_counter() {
			const d = '$'
			return [
				d + 'my_counter ' + d + 'mol_page',
				'\ttitle \\Counter',
				'\tbody /',
				'\t\t<= Count ' + d + 'mol_number',
				'\t\t\tvalue? <=> count? 0',
				'\t\t<= Reset_btn ' + d + 'mol_button_major',
				'\t\t\ttitle \\Reset',
				'\t\t\tclick? <=> reset? null',
			].join( '\n' )
		}

		preset_code_todo() {
			const d = '$'
			return [
				d + 'my_todo ' + d + 'mol_page',
				'\ttitle \\Todo List',
				'\ttools /',
				'\t\t<= Add_btn ' + d + 'mol_button_minor',
				'\t\t\ttitle \\Add',
				'\t\t\tclick? <=> add? null',
				'\tbody /',
				'\t\t<= Input ' + d + 'mol_string',
				'\t\t\tvalue? <=> task_text? \\',
				'\t\t\thint \\New task...',
				'\t\t<= List ' + d + 'mol_list',
				'\t\t\trows <= items /',
			].join( '\n' )
		}

		@$mol_action
		preset_hello( next?: any ) {
			this.source( this.preset_code_hello() )
		}

		@$mol_action
		preset_counter( next?: any ) {
			this.source( this.preset_code_counter() )
		}

		@$mol_action
		preset_todo( next?: any ) {
			this.source( this.preset_code_todo() )
		}

	}

}
