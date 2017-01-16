[![Build Status](https://travis-ci.org/selfrefactor/ils.svg?branch=master)](https://travis-ci.org/selfrefactor/rambda)
[![Codecov](https://img.shields.io/codecov/c/github/selfrefactor/ils.svg)](https://codecov.io/gh/selfrefactor/rambda)

# Rambda

Partial copy of *Ramda* using *Ramda.compose* and plain Javascript functions.

## Argumentation

I admire *Ramda* but most of the time I use only small part of what it offers.

But even when I create custom **Ramda** build, I still am not completely happy with its size.

## Example use
```
const R = require("rambda")
const result = R.compose(
  R.filter(val => val>2),
  R.flatten,
)([ [1], [2], [3], 4])
console.log(result) // => [3,4]
```

## Differences between Rambda and Ramda
Rambda shadows only small part of the Ramda's API. A few things to note:

- Rambda's methods are not compatible with the placeholder **Ramda.__**.

In some cases **Ramda.__** can be replaced by **Ramda.flip**. **Rambda** is tested for compatability with **Ramda.flip**.

- Rambda's **equals** doesn't protect against circular structures as **Ramda.equals** does

## Benchmark

Performance was not the main reason for this library, it is side effect.

The benchmark coverage is small.

Its current status:

[!Screen](/_inc/screen.png)

## API

#### add

[link to Ramda's docs for add method](http://ramdajs.com/docs/#add)

#### adjust

[link to Ramda's docs for adjust method](http://ramdajs.com/docs/#adjust)

#### any

[link to Ramda's docs for any method](http://ramdajs.com/docs/#any)

#### append

[link to Ramda's docs for append method](http://ramdajs.com/docs/#append)

#### compose

Just passing the original compose method of Ramda

[link to Ramda's docs for compose method](http://ramdajs.com/docs/#compose)

#### contains

[link to Ramda's docs for contains method](http://ramdajs.com/docs/#contains)

#### drop

[link to Ramda's docs for drop method](http://ramdajs.com/docs/#drop)

#### dropLast

[link to Ramda's docs for dropLast method](http://ramdajs.com/docs/#dropLast)

#### filter

[link to Ramda's docs for filter method](http://ramdajs.com/docs/#filter)

#### flatten

[link to Ramda's docs for flatten method](http://ramdajs.com/docs/#flatten)

#### head

[link to Ramda's docs for head method](http://ramdajs.com/docs/#head)

#### init

[link to Ramda's docs for init method](http://ramdajs.com/docs/#init)

#### join

[link to Ramda's docs for join method](http://ramdajs.com/docs/#join)

#### last

[link to Ramda's docs for last method](http://ramdajs.com/docs/#last)

#### length

[link to Ramda's docs for length method](http://ramdajs.com/docs/#length)

#### map

[link to Ramda's docs for map method](http://ramdajs.com/docs/#map)

#### omit

[link to Ramda's docs for omit method](http://ramdajs.com/docs/#omit)

#### path

[link to Ramda's docs for path method](http://ramdajs.com/docs/#path)

#### prepend

[link to Ramda's docs for prepend method](http://ramdajs.com/docs/#prepend)

#### pick

[link to Ramda's docs for pick method](http://ramdajs.com/docs/#pick)

#### prop

[link to Ramda's docs for prop method](http://ramdajs.com/docs/#prop)

#### propEq

[link to Ramda's docs for propEq method](http://ramdajs.com/docs/#propEq)

#### range

[link to Ramda's docs for range method](http://ramdajs.com/docs/#range)

#### repeat

[link to Ramda's docs for repeat method](http://ramdajs.com/docs/#repeat)

#### replace

[link to Ramda's docs for replace method](http://ramdajs.com/docs/#replace)

#### sort

[link to Ramda's docs for sort method](http://ramdajs.com/docs/#sort)

#### sortBy

[link to Ramda's docs for sortBy method](http://ramdajs.com/docs/#sortBy)

#### split

[link to Ramda's docs for split method](http://ramdajs.com/docs/#split)

#### splitEvery

[link to Ramda's docs for splitEvery method](http://ramdajs.com/docs/#splitEvery)

#### subtract

[link to Ramda's docs for subtract method](http://ramdajs.com/docs/#subtract)

#### tail

[link to Ramda's docs for tail method](http://ramdajs.com/docs/#tail)

#### take

[link to Ramda's docs for take method](http://ramdajs.com/docs/#take)

#### takeLast

[link to Ramda's docs for takeLast method](http://ramdajs.com/docs/#takeLast)

#### test

[link to Ramda's docs for test method](http://ramdajs.com/docs/#test)

#### toLower

[link to Ramda's docs for toLower method](http://ramdajs.com/docs/#toLower)

#### toUpper

[link to Ramda's docs for toUpper method](http://ramdajs.com/docs/#toUpper)

#### type

[link to Ramda's docs for type method](http://ramdajs.com/docs/#type)

#### values

[link to Ramda's docs for values method](http://ramdajs.com/docs/#values)

#### uniq

[link to Ramda's docs for uniq method](http://ramdajs.com/docs/#uniq)

#### update

[link to Ramda's docs for update method](http://ramdajs.com/docs/#update)
