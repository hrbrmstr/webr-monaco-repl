export const rCompletions = {
	provideCompletionItems: () => {
		const suggestions = [
			{
				label: 'install.runiverse',
				kind: monaco.languages.CompletionItemKind.Function,
				insertText: 'install.runiverse(${1:x})',
				insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
				documentation: 'Attempt to install a single package from R Universe.'
			},
			{
				label: 'apply',
				kind: monaco.languages.CompletionItemKind.Function,
				insertText: 'apply(${1:X}, ${2:MARGIN}, ${3:FUN})',
				insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
				documentation: 'Apply a function to the margins of an array or matrix.'
			},
			{
				label: 'lapply',
				kind: monaco.languages.CompletionItemKind.Function,
				insertText: 'lapply(${1:X}, ${2:FUN})',
				insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
				documentation: 'Apply a function to each element of a list or vector and return a list.'
			},
			{
				label: 'sapply',
				kind: monaco.languages.CompletionItemKind.Function,
				insertText: 'sapply(${1:X}, ${2:FUN})',
				insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
				documentation: 'Apply a function to each element of a list or vector and return a simplified result.'
			},
			{
				label: 'tapply',
				kind: monaco.languages.CompletionItemKind.Function,
				insertText: 'tapply(${1:X}, ${2:INDEX}, ${3:FUN})',
				insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
				documentation: 'Apply a function to each cell of a ragged array, given by a set of factor levels.'
			},
			{
				label: 'mapply',
				kind: monaco.languages.CompletionItemKind.Function,
				insertText: 'mapply(${1:FUN}, ${2:...})',
				insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
				documentation: 'Apply a function to corresponding elements of multiple lists or vectors.'
			},
			{
				label: 'library',
				kind: monaco.languages.CompletionItemKind.Function,
				insertText: 'library(${1:package})',
				insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
				documentation: 'Load a package into the current R session.'
			},
			{
				label: 'install.packages',
				kind: monaco.languages.CompletionItemKind.Function,
				insertText: 'install.packages("${1:package}")',
				insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
				documentation: 'Install one or more R packages.'
			},
			{
				label: 'data.frame',
				kind: monaco.languages.CompletionItemKind.Class,
				insertText: 'data.frame(${1:columns})',
				insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
				documentation: 'Create a data frame object.'
			},
			{
				label: 'read.csv',
				kind: monaco.languages.CompletionItemKind.Function,
				insertText: 'read.csv("${1:file_path}", header = ${2:TRUE}, sep = ${3:","}, stringsAsFactors = ${4:FALSE})',
				insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
				documentation: 'Read a CSV file and return a data frame.'
			},
			{
				label: 'ggplot',
				kind: monaco.languages.CompletionItemKind.Function,
				insertText: 'ggplot(${1:data}, aes(x = ${2:x}, y = ${3:y})) +\n\t${4:geom_point()}',
				insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
				documentation: 'Create a ggplot2 plot.'
			},
			{
				label: 'print',
				kind: monaco.languages.CompletionItemKind.Function,
				insertText: 'print(${1:expression})',
				insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
				documentation: 'Print the value of an R object.'
			},
			{
				label: 'lm',
				kind: monaco.languages.CompletionItemKind.Function,
				insertText: 'lm(${1:formula}, data = ${2:data})',
				insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
				documentation: 'Fit a linear model to the data.'
			},
			{
				label: 'glm',
				kind: monaco.languages.CompletionItemKind.Function,
				insertText: 'glm(${1:formula}, family = ${2:binomial}, data = ${3:data})',
				insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
				documentation: 'Fit a generalized linear model to the data.'
			},
			{
				label: 't.test',
				kind: monaco.languages.CompletionItemKind.Function,
				insertText: 't.test(${1:x}, ${2:y}, paired = ${3:FALSE})',
				insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
				documentation: 'Perform a t-test on the data.'
			},
			{
				label: 'cor',
				kind: monaco.languages.CompletionItemKind.Function,
				insertText: 'cor(${1:x}, ${2:y}, method = ${3:"pearson"})',
				insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
				documentation: 'Compute the correlation between two variables.'
			},
			{
				label: 'summary',
				kind: monaco.languages.CompletionItemKind.Function,
				insertText: 'summary(${1:object})',
				insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
				documentation: 'Display a summary of an R object.'
			},
			{
				label: 'anova',
				kind: monaco.languages.CompletionItemKind.Function,
				insertText: 'anova(${1:model1}, ${2:model2})',
				insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
				documentation: 'Perform an analysis of variance (ANOVA) test on one or more fitted model objects.'
			},
			{
				label: 'seq',
				kind: monaco.languages.CompletionItemKind.Function,
				insertText: 'seq(${1:from}, ${2:to}, ${3:by})',
				insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
				documentation: 'Generate a sequence of numbers.'
			},
			{
				label: 'length',
				kind: monaco.languages.CompletionItemKind.Function,
				insertText: 'length(${1:x})',
				insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
				documentation: 'Get the length of a vector or list.'
			},
			{
				label: 'sum',
				kind: monaco.languages.CompletionItemKind.Function,
				insertText: 'sum(${1:x})',
				insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
				documentation: 'Calculate the sum of elements in a vector.'
			},

			// Utils package functions
			{
				label: 'head',
				kind: monaco.languages.CompletionItemKind.Function,
				insertText: 'head(${1:x}, ${2:n})',
				insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
				documentation: 'Return the first n elements of a vector or list.'
			},
			{
				label: 'tail',
				kind: monaco.languages.CompletionItemKind.Function,
				insertText: 'tail(${1:x}, ${2:n})',
				insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
				documentation: 'Return the last n elements of a vector or list.'
			},

			// Tools package functions
			{
				label: 'toTitleCase',
				kind: monaco.languages.CompletionItemKind.Function,
				insertText: 'tools::toTitleCase(${1:x})',
				insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
				documentation: 'Convert a character vector to title case.'
			},
			{
				label: 'Rd2txt',
				kind: monaco.languages.CompletionItemKind.Function,
				insertText: 'tools::Rd2txt(${1:files}, ${2:out})',
				insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
				documentation: 'Convert R documentation files to plain text.'
			},
			{
				label: 'md5sum',
				kind: monaco.languages.CompletionItemKind.Function,
				insertText: 'tools::md5sum(${1:files})',
				insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
				documentation: 'Compute MD5 checksums of files.'
			},
		];
		console.log("suggest")
		return { suggestions };
	}
}

