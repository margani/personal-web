---
slug: '/powershell-arrays-quick-how-to/'
title: "PowerShell Arrays - Cheat Sheet"
description: "Quick how-to for using Arrays in PowerShell, including: creating arrays, adding/removing elements, iterating/filtering them."
layout: blog-post-layout
date: 2021-5-11
type: post
---
# PowerShell Arrays Quick Tips

You are looking for a short but useful help to use Arrays in PowerShell. Here you can find out quick examples of:

* [Creating arrays](#creating-an-array)
* [Adding elements](#adding-items-to-an-array)
* [Removing elements](#remove-an-item-from-an-array)
* [Accessing an element](#accessing-items)
* [Iterating them](#iterating-arrays)
* [Filtering them](#filtering-arrays)

in PowerShell.

## Creating an array

When you create an array by default it's type is Object[], unless you specify the type.

```PowerShell
# using @()
$itemsArray = @('Item 1', 'Item 2', 'Item 3')
# or ()
$itemsArray = ('Item 1', 'Item 2', 'Item 3')
# or just comma separated
$itemsArray = 'Item 1', 'Item 2', 'Item 3'

# Using ranges
$genericArray = 1..10
# instead of @('a', 'b', 'c', 'd', 'e')
$genericArray = 'a'..'e'

# Int32[] array
[int[]]$numbersArray = 1..10

# ArrayList, type will be List`1, Base type: System.Object
$itemsList = New-Object System.Collections.Generic.List[System.Object]
```

## Adding items to an array

```PowerShell
# Add one item
$itemsArray += 'Item 4'
# Add a list to array with @()
$itemsArray += @('Item 5', 'Item 6')
# Add a list to array with ()
$itemsArray += ('Item 5', 'Item 6')
# Add a list to array with just comma separated list
$itemsArray += 'Item 5', 'Item 6'

$genericArray += (11..20)
$genericArray += 'z'..'a'

$numbersArray += (11..20)
# The following command will add ASCII codes of the characters,
# because $numbersArray is an array of type Int32[]
$numbersArray += 'a'..'e'

# Add one item
$itemsList.Add('Item 1')
# Add a list to the end of our list with @()
$itemsList.AddRange(@('Item 2', 'Item 3'))
# Add a list to the end of our list with ()
$itemsList.AddRange(('Item 2', 'Item 3'))

# Nope! this doesn't work
$itemsList.AddRange('Item 2', 'Item 3') #Error
```

## Remove an item from an array

Created arrays using `@()`, `()` or comma separated items, are **fixed** arrays. It means you can't remove items from them, but you can create a new list with remaining items.

```PowerShell
$itemsArray = @('Item 1', 'Item 2', 'Item 3')
# Remove 'Item 2'
$newItemsArray = $itemsArray | Where-Object { $_ –ne 'Item 2' }

# Remove 'Item 2'
$newItemsArray = $itemsArray[0, 2]
```

Or you can use array lists:

```PowerShell
$itemsList = New-Object System.Collections.Generic.List[System.Object]
$itemsList.AddRange(@('Item 1', 'Item 2', 'Item 3'))
# Remove 'Item 1'
$isRemoved = $itemsList.Remove('Item 1')
```

## Working with Arrays

### Accessing items

```PowerShell
$itemsArray = @('Item 1', 'Item 2', 'Item 3')

$itemsArray[0] # => Item 1
$itemsArray[2] # => Item 3
$itemsArray[-1] # => Item 3
$itemsArray[-3] # => Item 1
$itemsArray[-4] # => $NULL, no error
$itemsArray[3] # => $NULL, no error

# The following will throw an error
# OperationStopped: Index was outside the bounds of the array.
$itemsArray[3] = 'Item 4'

$unknownVariable # => $NULL
$unknownVariable[0] # => Error: Cannot index into a null array.
```

### Iterating Arrays

```PowerShell
$itemsArray = @('Item 1', 'Item 2', 'Item 3')

# ForEach-Object Pipeline
$itemsArray | ForEach-Object {"Item: [$_]"}

# For loop
foreach ($item in $itemsArray) {
    "Item: [$item]"
}

# Foreach method
$itemsArray.foreach({"Item: [$_]"})
$itemsArray.foreach {"Item: [$_]"}

# For loop
for ($index = 0; $index -lt $itemsArray.count; $index++) {
    "Item: [{0}]" -f $itemsArray[$index]
}

# Switch
switch($itemsArray)
{
    'Item 1'
    {
        "Item: [$_]"
    }
    'Item 3'
    {
        "Item: [$_]"
    }
    Default
    {
        "Item: [$_] not in the list of switch"
    }
}
```

### Filtering Arrays

```PowerShell
$itemsArray = @('Item 1', 'Item 2', 'Item 3')

# Where-Object
$itemsArray | Where-Object { $_ -like '*tem*' }

# Where method
$itemsArray.Where({ $_ -like '*tem*' })
```

## Conclusion

This was very short and quick introduction to PowerShell Arrays. You can find more information on PowerShell commands and Arrays at [Microsoft documentations on Arrays in PowerShell](https://docs.microsoft.com/en-us/powershell/module/microsoft.powershell.core/about/about_arrays?view=powershell-7.1).
