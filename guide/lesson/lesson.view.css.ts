namespace $.$$ {

	$mol_style_define( $bog_docs_guide_lesson, {

		Code_area: {
			display: 'flex',
			flex: {
				wrap: 'wrap',
			},
			gap: $mol_gap.block,
		},

		Editor: {
			flex: {
				basis: '300px',
				grow: 1,
				shrink: 1,
			},
			minHeight: '10rem',
		},

		Preview: {
			flex: {
				basis: '300px',
				grow: 1,
				shrink: 1,
			},
		},

		Task_section: {
			flex: {
				direction: 'column',
			},
			gap: $mol_gap.block,
		},

		Actions: {
			gap: $mol_gap.block,
			flex: {
				wrap: 'wrap',
			},
			align: {
				items: 'center',
			},
		},

		Check_success: {
			color: '#388e3c',
			font: {
				weight: 'bold',
			},
		},

		Check_error: {
			font: {
				weight: 'bold',
			},
		},

	} )

}
