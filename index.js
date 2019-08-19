/* 
 * This work has been done by Phillip Ochola Makanyengo
 * Email: its2uraps@gmail.com
 *
 * This work uses open source code and libraries and 
 * can therefore be replicated unless certain portions
 * are stated otherwise. 
 *
 * Please refer to the author when using the code.
 * 
 * Copyright (c) [2019], [Phillip Ochola Mak'Anyengo] <[its2uraps@gmail.com]>
 * 
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 */

"use strict";

// Import utils lib.. This includes the buffer object and
// other helper tools that will be added on

module.exports = (() => {

    if (typeof Promise == "function") {

        class sPromise extends Promise {

            constructor(executor) {
                super((resolve, reject) => {
                    return executor(resolve, reject);
                })

                this._caseTag = [];
                this._caseFunc = [];
                this.onRejected = () => {};
                this._switch = () => {};

            }

            case (_case, _cb) {
                if (!!_case || _case === 0) {
                    this._caseTag.push({ c: "==", case: _case });
                    this._caseFunc.push(_cb);
                }
                return this;
            }

            strictCase(_case, _cb) {
                if (!!_case || _case === 0) {
                    this._caseTag.push({ c: "===", case: _case });
                    this._caseFunc.push(_cb);
                }
                return this;
            }

            //This function executes the case conditions
            switch (onFulfilled, onRejected) {
                let scope = this;
                this.then(comparator => {
                    try {
                        let _switch = () => {};

                        if (scope._caseTag.length !== 0) {
                            _switch = (scope._caseFunc.filter((tag, index) => {
                                switch (scope._caseTag[index].c) {
                                    case "==":
                                        return scope._caseTag[index].case == comparator;
                                    case "===":
                                        return scope._caseTag[index].case === comparator;
                                }
                            }))[0] || (() => {}); //Get the first function that fulfills the condition

                        }
                        onFulfilled(_switch());

                    } catch (err) {
                        if (onRejected) onRejected(err);
                        else {
                            scope.onRejected(err);
                        };
                    }
                });

                return this;
            } catch (onRejected) {
                this.onRejected = onRejected
                return this;
            }

        }

        return sPromise;

    } else throw new Error("sPromise : Promises are not Supported!");

})();