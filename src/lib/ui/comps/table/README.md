# UNAFFI Table

## How to use:
```
<SearchInput />
<Table>
    <TableColumns {headings}>
        <TableHeadingRow>
            {#each headings as heading}
                <TableHeading
                    ...each heading's props here...
                />
            {/each}
        </TableHeadingRow>

        <TableBody>
            {#each data as item}
                <TableRow>
                    <TableCell>
                        ...whatever HTML you want to display...
                    </TableCell>
                </TableRow>
            {/each}
        </TableBody>
    </TableColumns>

    <TableFooter>
        ...whatever HTML you want to display...
    </TableFooter>
</Table>
```