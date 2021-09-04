---
categories: ["angular", "ngrx"]
date: 2019-04-30T00:00:00Z
published: true
title: Which RxJS Operators to use in your NgRx Effects
---

When creating NgRx effects you need to decide which RxJS operators to use.  There are a lot of RxJS operators but the ones that we are going to use are: mergeMap, concatMap, exhaustMap, and switchMap.  Each of these have recommended use cases in order to avoid race conditions.

### Operator Explanation

Before we look at when to use each of the operators, lets look at what each of the operators does.

* **mergeMap**: subscribe immediately, never cancel or discard
* **concatMap**: subscribe after the last one finishes
* **exhaustMap**: discard until the last one finishes
* **switchMap**: cancel the last one if it has not completed

### Operator Usage

Now lets look at when to use each of the operators

* **mergeMap**: deleting items
* **concatMap**: updating or creating items
* **exhaustMap**: non-parameterized queries
* **switchMap**: parameterized queries

By following these recommendations on usage, you will avoid race conditions within your effects.
