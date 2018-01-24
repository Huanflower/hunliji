function boot() {
    this.result = "", this.card_id = "", this.type = "", this.guests = {}, this.guestState = !0, this.allPage = [], this.width = window.innerWidth, this.height = window.innerHeight, this.UI_WIDTH = 750, this.UI_HEIGHT = 1220, this.seating = 0, this.autoState = !1, this.musicStatePause = "false", this.log = [], this.videoNext = !1, this.videoHave = !1, this.editState = !1, this.hideEditState = !1, this.infiniteArr = [], this.chatNo = 0, this.chatSeat = 0, this.giftSeat = 0, this.gift_m = 0, this.gift_t, this.showGiftPage = !0, this.giftProperty = {}, this.send_state = 0, this.send_name = "", this.send_price = "", this.send_wish = "祝你们爱情永驻，甜蜜幸福", this.gift_touchSeat = 0, this.otherState = {
        chat_state: !1,
        chat_entry: !1,
        chat_gift: !1,
        chat_cash: !1
    }, this.localhost = location.host.indexOf("api") > -1 ? "//test.hunliji.com" : "//" + location.host, this.saashost = location.host.indexOf("www") > -1 ? "//www.yunkexiongdi.com" : "//erptest.hunliji.com", this.API = {
        card_info: "/p/wedding/index.php/home/APIInvitationV3/card_h5",
        all_gifts: "/p/wedding/index.php/Home/APICardGift2/index",
        sendCash: "/p/wedding/index.php/Home/APICardCashGift/give",
        sendGift: "/p/wedding/index.php/Home/APICardGift2/give",
        reply: "/p/wedding/index.php/home/APIInvitationV3/reply",
        gifts_and_replies: "/p/wedding/index.php/Home/APICardGift2/gifts_and_replies",
        sdkData: "/v1/api/app/tracker/batch.json",
        template: "/p/wedding/index.php/Home/APIInvitationV3/previewTemplate",
        otherMapImage: "/p/wedding/index.php/home/APIInvitationV3/card_map_image",
        getInfo: "/saas/index.php/Api/APIYx_wxalbum_appointment",
        appointment: "/saas/index.php/Api/APIYx_wxalbum_appointment"
    }
}
boot.prototype = function () {
    return wxsq = function () {
        var a = this,
            b = 99 / this.UI_WIDTH * this.width + "px",
            c = 110 / this.UI_WIDTH * this.width + "px",
            d = 80 / this.UI_WIDTH * this.width + "px",
            e = 26 / this.UI_WIDTH * this.width + "px",
            f = 96 / this.UI_WIDTH * this.width + "px",
            g = 56 / this.UI_WIDTH * this.width + "px",
            h = 30 / this.UI_WIDTH * this.width + "px",
            i = 690 / this.UI_WIDTH * this.width + "px",
            j = '<div id="shouquan" style="background: #fff;z-index: 50;width: ' + i + ";display:-webkit-box;border-bottom:1px solid #e7e7e7;padding:0 " + h + "; height:" + b + "; line-height: " + b + "; font-size: " + e + "; color: #000; position:fixed; top:-" + c + '; -webkit-transition: top 600ms ease-in;">' + "<span>是否愿意接受新人的回复消息</span>" + '<div style="margin-left: ' + d + '; text-align: center;">' + '<span style="line-height: ' + g + ";display: inline-block;background:#1aad19;color:white; width: " + f + "; height: " + g + '; border-radius: 4px;border: 2px solid #179c16;" id="shouquanYes">是</span>' + '<span style="line-height: ' + g + ";display: inline-block;background:#f8f8f8;margin-left:" + h + ";width: " + f + "; height: " + g + '; border-radius: 4px;border: 2px solid #dfdfdf;" id="shouquanNo">否</span>' + "</div>" + "</div>";
        $("body").append(j), $(document).on("touchstart", "#shouquanYes", function () {
            sessionStorage.setItem("current_seating", a.seating);
            var b = "http://www.hunliji.com/p/wedding/index.php/home/APICardUserReply/wechat_callback/id/" + a.confirm_id + "/type/" + (a.confirm_type || "");
            location.href = "https://mp.weixin.qq.com/mp/subscribemsg?action=get_confirm&appid=wx6260e0fbaa341dd2&scene=1000&template_id=ZzjyGF-sqXAXAQ2eff0P_RG8yblzA50SMJk1NXwUTZ4&redirect_url=" + encodeURIComponent(b) + "&reserved=test#wechat_redirect"
        }), $(document).on("touchstart", "#shouquanNo", function () {
            $("#shouquan").css("top", "-" + c)
        })
    }, wxsq_event = function (a, b) {
        this.confirm_id = b, this.confirm_type = a, $("#shouquan").css("top", "0px")
    }, ajax_reply = function (a, b, c) {
        var d = this;
        $.ajax({
            url: d.localhost + d.API.reply,
            type: "post",
            data: a,
            success: function (a) {
                0 == a.status.RetCode && (d.CardRepliesV2_id = c ? null : a.data && a.data.id, d.winMsg({
                    img: "//qnm.hunliji.com/o_1bjph0pq0u9aoib3fqo87169m7.png",
                    disMsg: "发送成功",
                    giftID: "giftBtnWin",
                    giftCol: "送礼物",
                    cashID: "cashBtnWin",
                    cashCol: "送礼金"
                }), d.chatState = !1, b ? b() : null)
            }
        })
    }, ajax_gifts = function () {
        var a = this;
        $.ajax({
            url: '/婚礼纪_files/index.json',
            type: "get",
            data: {
                with_myb: a.with_myb ? 1 : 0
            },
            success: function (b) {
                0 == b.status.RetCode && (a.allGifts = b.data.list, b.data.list.forEach(function (b, c) {
                    1 == b.is_select && (a.giftSeat = c)
                }), a.selectGift(), a.giftPage(), a.selectGift_v2(), a.getCookie("showGiftPage") && (a.showGiftPage = !1, $("#giftPage").css({
                    top: 0,
                    opacity: 1
                }), $("#upImg").hide(), setTimeout(function () {
                    a.writeCookie("showGiftPage", "", -1)
                }, 300)))
            }
        })
    }, ajax_info = function () {
        var a = this,
            b = document.createElement("div"),
            c = document.createElement("div"),
            d = document.createElement("div");
            b.setAttribute("id", "wrap"),
            c.setAttribute("id", "all-page"),
            d.setAttribute("id", "other"),
            b.appendChild(c),
            document.body.appendChild(d),
            document.body.appendChild(b),
            a.getCookie("editState") && a.type && (this.editState = a.getCookie("editState")), this.card_id = this.getParams("card_id"), this.type = this.getParams("type"),
        //    console.log(1111);
        $.ajax({
            url: '/婚礼纪_files/cred_5.json',
            type: "get",
            data: {
                id: a.card_id
            },
            success: function (b) {
                var c, d, e, f, g;
                console.log(b);
                if (0 == b.status.RetCode) {
                    if (1 == b.data.cardInfo.closed && !a.type) return a.closeCardState(), void 0;
                    if (a.result = b.data, a.card_claim = a.result.cardInfo.card_claim, document.getElementById("all-page").style.height = a.height + "px", a.init(), a.musicOpen = a.result.music.img || "//qnm.hunliji.com/o_1bi67lq091qtt1gfs60cpadqjj7.png", a.musicClose = a.result.music.close_img || "//qnm.hunliji.com/o_1bi67m2q63tilg81vh1q3v10g6c.png", a.pageIcon = a.result.page_icon || "//qnm.hunliji.com/o_1agpam0fsibn2814j110101jcr7.png", setTimeout(function () {
                            a.otherAction({
                                chat_state: 1 == a.result.cardInfo.set_up.danmu ? !0 : !1,
                                chat_entry: 1 == a.result.cardInfo.set_up.wish ? !0 : !1,
                                chat_gift: 1 == a.result.cardInfo.set_up.gift ? !0 : !1,
                                chat_cash: 1 == a.result.cardInfo.set_up.gold ? !0 : !1
                            })
                        }, 1e3), a.getCookie("musicStatePause") && (a.musicStatePause = "false", a.type && (a.musicStatePause = "false", a.writeCookie("musicStatePause", "false", 360))), 1 == b.data.cardInfo.closed && !a.type) return !1;
                    b.data.music.audio && (a.type && $("body").on("touchstart", function () {
                        "false" == a.musicStatePause && document.getElementById("playMusic").play()
                    }), document.getElementById("playMusic").setAttribute("src", b.data.music.audio.replace("http:", "")), "false" == a.musicStatePause && document.getElementById("playMusic").play(), navigator.userAgent.indexOf("iPhone") > -1 && (wx.config({
                        debug: !1,
                        appId: "",
                        timestamp: 1,
                        nonceStr: "",
                        signature: "",
                        jsApiList: []
                    }), wx.ready(function () {
                        "false" == a.musicStatePause && document.getElementById("playMusic").play()
                    })), c = document.createElement("div"), d = document.createElement("img"), e = a.musicOpen, f = a.musicClose, d.setAttribute("src", "true" != a.musicStatePause ? e : f), c.setAttribute("id", "musicBtn"), c.appendChild(d), c.style.width = 84 / a.UI_WIDTH * a.width + "px", c.style.top = 20 / a.UI_WIDTH * a.width + "px", c.style.right = 20 / a.UI_WIDTH * a.width + "px", document.getElementById("other").appendChild(c), g = document.getElementById("playMusic"), g.addEventListener("timeupdate", function () {
                        "false" == a.musicStatePause && $("#musicBtn").addClass("rotate")
                    }))
                }
            }
        })
    }, closeCardState = function () {
        $(".loadmore-loading").remove();
        var a = document.createElement("div");
        a.setAttribute("id", "closedCard"), a.innerHTML = '<img src="//qnm.hunliji.com/o_1c0gi5mnl1kpa172p17s18vkdm67.png" />', a.style.marginTop = 264 / this.UI_WIDTH * this.width + "px", document.body.appendChild(a)
    }, init = function () {
        // alert(1);
        function i(b, c) {
            if ($(".winBgt").length >= 1) return $(".bgt_tit").text(b), $(".bgt_col").text(c), $(".winBgt").show(), $("#chatBox").show(), !1;
            var d = document.createElement("div"),
                e = document.createElement("div");
            e.setAttribute("class", "winBgt"), d.setAttribute("id", "chatBox"), d.style.padding = 60 / a.UI_WIDTH * a.width + "px", d.innerHTML = '<img class="c_btn" style="position:absolute;top:0;right:0;width:' + 60 / a.UI_WIDTH * a.width + 'px" src="http://qnm.hunliji.com/o_1blaqnfq612e8arl1lb3g53n2u7.png"/>                <dl>                  <dt><h3 class="bgt_tit">' + b + '</h3></dt>                  <dd><p3 class="bgt_col">' + c + "</p></dd>                </dl>", document.getElementById("other").appendChild(e), document.getElementById("other").appendChild(d)
        }

        var e, f, g, h, a = this,
            b = {},
            c = 0,
            d = null;
        for (this.is_get_confirm = 1 == this.getCookie("is_get_confirm") || !1, this.with_myb = this.getParams("with_myb"), sessionStorage.backUrl = location.href, this.result.theme_background && $("body").css({
                background: "url(" + this.result.theme_background + ") 0 0 no-repeat",
                "background-size": "100% 100%"
            }), this.result.page.forEach(function (b, c) {
                b.layout.layTemplate && (a.guests.no = c, a.guests.html = b, a.buttonBg = b.layout.attendButton.boxColor, a.textColor = b.layout.attendButton.textColor)
            }), 0 == a.result.guest_template ? a.guestPageHide(!0) : null, b = a.result.share ? {
                imgUrl: a.result.share.icon,
                link: a.result.share.url,
                desc: a.result.share.desc,
                title: a.result.share.title
            } : {
                imgUrl: "" + a.result.share_img,
                link: a.isWeiXin() ? location.origin + "/p/wedding/Public/wap/invitationCard/demonew.html" + location.search : location.href,
                desc: a.result.cardInfo.groom_name + "与" + a.result.cardInfo.bride_name + "要结婚了，诚挚邀请您光临。",
                title: a.result.cardInfo.groom_name + "与" + a.result.cardInfo.bride_name + "的结婚邀请"
            }, wxShare.setWeiXinData({
                appId: "",
                imgUrl: b.imgUrl,
                link: b.link,
                desc: b.desc,
                title: b.title
            }), e = [], f = a.result.page[0].layout.elements, g = 0; g < f.length; g++) e.push(f[g].img);
        this.loading(e, function () {
            //    alert(2);
            $(".loadmore-loading").remove(),
                $("#musicBtn").css({
                    "margin-top": 0
                }),
                $("#all-page").empty().append(a.createPage(a.result.page).slice(0, 1)),
                setTimeout(function () {
                    1 == $("#all-page div.layout").length && $("#all-page").append(a.createPage(a.result.page).slice(1))
                }, 300),
                document.getElementById("vid") && (document.getElementById("vid").muted = "muted"),
                a.upDownIcon(),
                $("#vid").length > 0 && (document.getElementById("vid").addEventListener("loadedmetadata", function () {}),
                    document.getElementById("vid").addEventListener("timeupdate", function () {
                        $("#video").parent().removeClass("vhave")
                    }),
                    document.getElementById("vid").addEventListener("play", function () {})),
                a.touchAction(),
                a.videoHave && navigator.userAgent.indexOf("Android") <= -1 && $("#video").parent().addClass("vhave"),
                setTimeout(function () {
                    a.getCookie("editState") && a.type && (a.editState = "true" == a.getCookie("editState") ? !0 : !1), a.type && a.getParams("edit") && (a.editState = 1 == a.getParams("edit") ? !0 : !1), a.editIconState(a.editState)
                }, 3600),
                a.sdk(),
                a.is_get_confirm || (sessionStorage.getItem("gift_id") && a.wxsq_event("CardGift2Recv", sessionStorage.getItem("gift_id")),
                    sessionStorage.getItem("cash_id") && a.wxsq_event("CardGift2Recv", sessionStorage.getItem("cash_id"))), setTimeout(function () {
                    sessionStorage.getItem("current_seating") && (a.gotoPage(sessionStorage.getItem("current_seating")), a.chatMsg())
                }, 300)
        }), this.allImg(this.result), this.getGifts_replies(), this.ajax_gifts(), h = document.documentElement.clientHeight || document.body.clientHeight, $(window).on("resize", function () {
            var a = document.documentElement.clientHeight || document.body.clientHeight;
            h > a ? navigator.userAgent.indexOf("Android") > -1 && (console.log($("#gusetBox").height()), $("#gusetBox").css({
                bottom: h - a + "px",
                top: a - $("#gusetBox").height() + "px"
            }), $("#send_gift").css("top", "0px")) : (navigator.userAgent.indexOf("Android") > -1 && $("#gusetBox").css({
                bottom: "0",
                top: "auto"
            }), $("#send_gift").css("top", "auto"))
        }), $(document).on("touchstart", ".c_btn,.winBgt", function () {
            $(".winBgt").hide(), $("#chatBox").hide()
        }), $(document).on("touchstart", ".c_g p", function () {
            var b = ($(this).text().split("："), $(this).find("span").text()),
                c = $(this).find("em").text();
            i(b, c)
        }), $(document).on("touchstart", "#musicBtn", function () {
            //    alert(2);
            var b = $(this);
            b.hasClass("rotate") ? (a.musicStatePause = "true", a.writeCookie("musicStatePause", "true", 360), document.getElementById("playMusic").pause(), b.removeClass("rotate"), $("#musicBtn img").attr("src", a.musicClose)) : (a.musicStatePause = "false", a.writeCookie("musicStatePause", "false", 360), document.getElementById("playMusic").play(), $("#musicBtn img").attr("src", a.musicOpen))
        }), $(document).on("touchstart", "#video", function () {
            document.getElementById("vid").muted = "muted", document.getElementById("vid").play(), $(".videoMH").removeClass("nosee")
        }), $(document).on("touchstart", ".noVideo", function () {
            location.reload()
        }), $(document).on("touchstart", ".navigation", function () {
            return a.type ? !1 : (location.href = a.mapUrl, void 0)
        }), $(document).on("touchstart", ".dwIcon", function () {
            return a.type ? !1 : (location.href = a.mapUrl, void 0)
        }), $(document).on("touchstart", "#sendBtnWin", function () {
            $(".winMsg").remove(), $(".winBg").remove()
        }), $(document).on("touchstart", ".editIcon", function () {
            var b = {},
                c = $(this);
            b.id = c.attr("id"), b.page_id = c.attr("page_id"), b.type = c.attr("type"), c.attr("videoP") && (b.video_path = c.attr("videoP"), b.video_width = c.attr("videoW"), b.video_height = c.attr("videoH")), c.hasClass("card_info") ? a.editCard_app("a", {
                cardInfo: !0
            }) : a.editCard_app("b", b)
        }), $(document).on("touchstart", ".sureBtn", function () {
            $(".ac_wish_txt").blur(), $(".ac_name_txt").blur(), clearInterval(d), "" == $(".ac_wish_txt").val().replace(/[ ]/g, "") || "请留下你的祝福..." == $(".ac_wish_txt").val() ? a.outputMsg("请留下你的祝福...") : "" == $(".ac_name_txt").val().replace(/[ ]/g, "") || "请输入您的姓名..." == $(".ac_name_txt").val() ? a.outputMsg("请输入您的姓名...") : (a.send_name = $(".ac_name_txt").val(), a.ajax_reply({
                card_id: a.card_id,
                name: a.send_name,
                state: 3,
                wish_language: $(".ac_wish_txt").val()
            }, function () {
                $(".ac_wish_txt").val("请留下你的祝福..."), a.getGifts_replies(1)
            }), $("#allCode").css({
                zIndex: "-1",
                opacity: 0
            }))
        }), $(document).on("input", ".ac_wish_txt,.ac_name_txt", function () {
            "" != $(".ac_wish_txt").val().replace(/[ ]/g, "") && "请留下你的祝福..." != $(".ac_wish_txt").val() && "" != $(".ac_name_txt").val().replace(/[ ]/g, "") && "请输入您的姓名..." != $(".ac_name_txt").val() ? $(".sureBtn").addClass("active") : $(".sureBtn").removeClass("active")
        }), $(document).on("focus", ".ac_wish_txt", function () {
            a.chatState || (a.chatState = !0, $(this).addClass("zc"), $(this).val("").focus()), navigator.userAgent.indexOf("iPhone") > -1 && navigator.userAgent.indexOf("iPhone OS 11") <= -1 && (d = setInterval(function () {
                document.body.scrollTop = document.body.scrollHeight
            }, 200))
        }), $(document).on("blur", ".ac_wish_txt", function () {
            "" == $(this).val().replace(/[ ]/g, "") && (a.chatState = !1, $(this).removeClass("zc"), $(this).val("请留下你的祝福...")), clearInterval(d)
        }), $(document).on("touchend", "#allCode_bg", function () {
            setTimeout(function () {
                $(".ac_wish_txt").val("").blur(), $(".ac_name_txt").blur()
            }, 300)
        }), $(document).on("touchend", "#guestBg", function () {
            setTimeout(function () {
                $("#gusetName").val("").blur()
            }, 300)
        }), $(document).on("touchend", "#chatEntry", function (b) {
            return b.stopPropagation(), "" != $(".ac_wish_txt").val().replace(/[ ]/g, "") && "请留下你的祝福..." != $(".ac_wish_txt").val() && "" != $(".ac_name_txt").val().replace(/[ ]/g, "") && "请输入您的姓名..." != $(".ac_name_txt").val() ? $(".sureBtn").addClass("active") : $(".sureBtn").removeClass("active"), a.type ? (a.outputMsg("请先发送请帖"), !1) : $(this).parent().parent().hasClass("noAction") ? !1 : ("" != a.send_name && $(".ac_name_txt").val(a.send_name), setTimeout(function () {
                $("#allCode").css({
                    zIndex: 9,
                    opacity: 1
                }), $("#allCode_bg").css({
                    "-webkit-transform": "translateY(0)"
                })
            }, 300), navigator.userAgent.indexOf("Android") > -1 ? setTimeout(function () {
                $(".ac_wish_txt").focus()
            }, 300) : navigator.userAgent.indexOf("iPhone") > -1 && $(".ac_wish_txt").focus(), void 0)
        }), $(document).on("touchstart", "#allCode_bg", function () {
            console.log(this), $(this).css({
                "-webkit-transform": "translateY(" + a.height + "px)"
            }), $("#allCode").css({
                zIndex: "-1",
                opacity: 0
            })
        }), $(document).on("focus", ".ac_name_txt", function () {
            "请输入您的姓名..." == $(this).val() && ($(this).val(""), $(this).addClass("zc")), navigator.userAgent.indexOf("iPhone") > -1 && navigator.userAgent.indexOf("iPhone OS 11") <= -1 && (d = setInterval(function () {
                document.body.scrollTop = document.body.scrollHeight
            }, 200))
        }), $(document).on("blur", ".ac_name_txt", function () {
            "" == $(this).val().replace(/[ ]/g, "") && ($(this).val("请输入您的姓名..."), $(this).removeClass("zc")), clearInterval(d)
        }), $(document).on("touchstart", "#giftShow", function () {
            return a.type ? (a.outputMsg("请先发送请帖"), !1) : $(this).parent().hasClass("nobody") ? !1 : (a.sdkData({
                action: "giftShow",
                eventable_type: "Card",
                additional: {
                    ip: a.ip,
                    card_id: a.card_id,
                    num: a.rans(32)
                }
            }), "" != a.send_name && $("#nameTxt").val(a.send_name), $("#send_gift").css("-webkit-transform", "translateY(0)"), $(".bgc").css("-webkit-transform", "translateY(0)"), void 0)
        }), $(document).on("touchstart", ".bgc", function () {
            $("#send_gift").css("-webkit-transform", "translateY(" + a.height + "px)"), $(".bgc").css("-webkit-transform", "translateY(" + a.height + "px)"), document.activeElement.blur(), !a.is_get_confirm && a.CardRepliesV2_id && a.wxsq_event("CardRepliesV2", a.CardRepliesV2_id)
        }), $(document).on("focus", "#nameTxt", function () {
            ("请输入您的姓名" == $(this).val() || "" == a.send_name) && ($(this).val(""), $(this).addClass("zc"))
        }), $(document).on("blur", "#nameTxt", function () {
            "" == $(this).val().replace(/[ ]/g, "") ? ($(this).val("请输入您的姓名"), $(this).removeClass("zc")) : a.send_name = $(this).val()
        }), $(document).on("touchstart", ".g_layout", function () {
            var b = $(".g_layout").index(this);
            $(".g_layout span").removeClass("ap"), $(this).find("span").addClass("ap"), $(".g_layout_v2 span").removeClass("ap"), $(".g_layout_v2").eq(b).find("span").addClass("ap"), a.giftProperty.title = $(".g_layout").eq(b).find("span").attr("title"), a.giftProperty.id = $(".g_layout").eq(b).find("span").attr("cid"), a.giftProperty.price = $(".g_layout").eq(b).find("span").attr("price"), a.allGifts[b].insurance_type && "0" != a.allGifts[b].insurance_type ? $(".gift_tishi").html('<img style="width: ' + 36 / a.UI_WIDTH * a.width + 'px; vertical-align: top; display: inline-block" src="http://qnm.hunliji.com/o_1bojvo29s2toeor2nk2p1mfbc.png"/><p style="color: #578afe;display: inline-block; width:' + 390 / a.UI_WIDTH * a.width + "px; height: " + 78 / a.UI_WIDTH * a.width + "px;line-height: " + 26 / a.UI_WIDTH * a.width + "px;font-size: " + 24 / a.UI_WIDTH * a.width + 'px; overflow: hidden">' + (a.allGifts[b].insurance_desc || "") + "</p>") : $(".gift_tishi").html('<img style="width:' + 338 / a.UI_WIDTH * a.width + "px;height: " + 78 / a.UI_WIDTH * a.width + 'px;" src="//qnm.hunliji.com/o_1bqf7v9454h1fjm1f2f1kmt1tguc.jpg"/>')
        }), $(document).on("touchstart", ".g_layout_v2", function () {
            var b = $(".g_layout_v2").index(this),
                c = "";
            $(".g_layout_v2 span").removeClass("ap"), $(this).find("span").addClass("ap"), $(".g_layout span").removeClass("ap"), $(".g_layout").eq(b).find("span").addClass("ap"), a.giftProperty.title = $(".g_layout_v2").eq(b).find("span").attr("title"), a.giftProperty.id = $(".g_layout_v2").eq(b).find("span").attr("cid"), a.giftProperty.price = $(".g_layout_v2").eq(b).find("span").attr("price"), c = a.giftProperty.title + "（￥" + a.giftProperty.price + "）", $(".gift_name_txt").text(c), a.allGifts[b].insurance_type && "0" != a.allGifts[b].insurance_type ? $(".gift_tishi_v2").html('<img style="width: ' + 24 / a.UI_WIDTH * a.width + "px;margin-right: " + 6 / a.UI_WIDTH * a.width + "px;margin-top: " + 6 / a.UI_WIDTH * a.width + 'px; vertical-align: top; display: inline-block" src="http://qnm.hunliji.com/o_1br64tvi498s1k1g68l1ir0cl9h.png"/><p style="color: #578afe;display: inline-block; width:' + 490 / a.UI_WIDTH * a.width + "px; height: " + 78 / a.UI_WIDTH * a.width + "px;line-height: " + 36 / a.UI_WIDTH * a.width + "px;font-size: " + 24 / a.UI_WIDTH * a.width + 'px; overflow: hidden">' + (a.allGifts[b].insurance_desc || "") + "</p>") : $(".gift_tishi_v2").html('<img src="//qnm.hunliji.com/o_1br0jjltn1b4f1nntnu41b2n1ih9c.png" style="width:' + 532 / a.UI_WIDTH * a.width + 'px"/>')
        }), $(document).on("touchstart", "#sendGiftBtn", function () {
            if ("请输入您的姓名" == $("#nameTxt").val() || "" == $("#nameTxt").val().replace(/[ ]/g, "")) return a.outputMsg("请填写姓名"), !1;
            a.send_name = $("#nameTxt").val(), $("#send_gift").css("-webkit-transform", "translateY(" + a.height + "px)"), $(".bgc").css("-webkit-transform", "translateY(" + a.height + "px)"), sessionStorage.setItem("current_seating", a.seating);
            var b = (new Date).getTime();
            a.sendGift({
                payName: a.send_name,
                paySouName: a.user_name,
                payApi: a.API.sendGift,
                payGift: a.giftProperty.title,
                payParams: {
                    current_time: b,
                    card_gift2_id: a.giftProperty.id,
                    card_id: a.card_id,
                    giver_name: a.send_name,
                    user_id: a.user_id,
                    wishes: a.send_wish
                },
                payMoney: a.giftProperty.price,
                payCallBack: "/p/wedding/Public/hlj-m/card-pay-success/index.html"
            }), $("#nameTxt").blur(), $("body").append('<div class="loadmore-loading"><div></div><p></p></div>')
        }), $(document).on("touchstart", "#sendGiftBtnV2", function () {
            if ("请输入您的姓名" == $("#nameTxtV2").val() || "" == $("#nameTxtV2").val().replace(/[ ]/g, "")) return a.outputMsg("请填写姓名"), !1;
            a.send_name = $("#nameTxtV2").val(), $("#gift_bg").css({
                "-webkit-transform": "translateY(" + a.height + "px)"
            }), $("#nameTxtV2").blur(), a.writeCookie("showGiftPage", !0, 1), setTimeout(function () {
                $("#gift_form").css({
                    zIndex: "-1",
                    opacity: 0
                }), $("#gift_form").css({
                    "-webkit-transform": "translateY(-180px)"
                })
            }, 300), sessionStorage.setItem("current_seating", a.seating);
            var b = (new Date).getTime();
            a.sendGift({
                payName: a.send_name,
                paySouName: a.user_name,
                payApi: a.API.sendGift,
                payGift: a.giftProperty.title,
                payParams: {
                    current_time: b,
                    card_gift2_id: a.giftProperty.id,
                    card_id: a.card_id,
                    giver_name: a.send_name,
                    user_id: a.user_id,
                    wishes: a.send_wish
                },
                payMoney: a.giftProperty.price,
                payCallBack: "/p/wedding/Public/hlj-m/card-pay-success/index.html"
            }), $("#nameTxtV2").blur(), $("body").append('<div class="loadmore-loading"><div></div><p></p></div>')
        }), $(document).on("touchstart", ".red_packets a", function (a) {
            c = a.changedTouches[0].clientY
        }), $(document).on("touchend", ".red_packets a", function (b) {
            if (b.changedTouches[0].clientY - c < 10 && b.changedTouches[0].clientY - c >= 0) {
                if (a.type) return a.outputMsg("请先发送请帖"), !1;
                if ($(this).parent().hasClass("nobody")) return !1;
                a.sdkData({
                    action: "priceShow",
                    eventable_type: "Card",
                    additional: {
                        ip: a.ip,
                        card_id: a.card_id,
                        num: a.rans(32)
                    }
                }), "" != a.send_name && $(".red_packets_name_txt").val(a.send_name), $("#red_packets_bg").removeClass("hide").css({
                    zIndex: "12",
                    opacity: 1
                }), $("#red_packets_form").removeClass("hide").css({
                    zIndex: "12",
                    opacity: 1
                }), $(".money").css({
                    "-webkit-animation": "money 1000ms ease-in-out 100ms forwards"
                }), a.writeCookie("giftPage_enter", !0, 1)
            }
        }), $(document).on("touchstart", ".close_red_packets", function () {
            $("#red_packets_bg").addClass("hide").css({
                zIndex: "-1",
                opacity: 0
            }), $("#red_packets_form").addClass("hide").css({
                zIndex: "-1",
                opacity: 0
            }), $(".money").css({
                "-webkit-animation": "none"
            })
        }), $(document).on("touchstart", "#priceShow", function () {
            return a.type ? (a.outputMsg("请先发送请帖"), !1) : $(this).parent().hasClass("nobody") ? !1 : (a.sdkData({
                action: "priceShow",
                eventable_type: "Card",
                additional: {
                    ip: a.ip,
                    card_id: a.card_id,
                    num: a.rans(32)
                }
            }), "" != a.send_name && ($(".red_packets_name_txt").val(a.send_name), $(".red_packets_name_txt").addClass("zc")), $("#red_packets_bg").removeClass("hide").css({
                zIndex: "12",
                opacity: 1
            }), $("#red_packets_form").removeClass("hide").css({
                zIndex: "12",
                opacity: 1
            }), $(".money").css({
                "-webkit-animation": "money 1000ms ease-in-out 100ms both"
            }), void 0)
        }), $(document).on("touchstart", "#sendPriceBtnV2", function () {
            if ("请输入您的姓名" != $(".red_packets_name_txt").val() && "" != $(".red_packets_name_txt").val().replace(/[ ]/g, ""))
                if (a.send_name = $(".red_packets_name_txt").val(), "" == $(".red_packets_money_txt").val().replace(/[ ]/g, "") || "请输入礼金金额" == $(".red_packets_money_txt").val().replace(/[ ]/g, "")) a.outputMsg("请输入礼金金额");
                else if (isNaN($(".red_packets_money_txt").val())) a.outputMsg("礼金金额输入不合法");
            else if (parseInt($(".red_packets_money_txt").val()) < 1) a.outputMsg("礼金金额不能小于1元");
            else if (parseInt($(".red_packets_money_txt").val()) > 3e3) a.outputMsg("已超出微信单笔支付3000元的限额，请调整金额后再试");
            else {
                a.send_price = $(".red_packets_money_txt").val(), $("#red_packets_bg").addClass("hide").css({
                    zIndex: "-1",
                    opacity: 0
                }), $("#red_packets_form").addClass("hide").css({
                    zIndex: "-1",
                    opacity: 0
                }), a.getCookie("giftPage_enter") && a.writeCookie("showGiftPage", !0, 1), sessionStorage.setItem("current_seating", a.seating);
                var b = (new Date).getTime();
                a.sendCash({
                    api: a.API.sendCash,
                    callback: "/p/wedding/Public/hlj-m/card-pay-success/index.html",
                    data: {
                        card_id: a.card_id,
                        current_time: b,
                        giver_name: a.send_name,
                        price: a.send_price
                    },
                    SouName: a.user_name
                }), a.writeCookie("giftPage_enter", "", -1), $(".red_packets_name_txt").blur(), $(".red_packets_money_txt").blur(), $("body").append('<div class="loadmore-loading"><div></div><p></p></div>')
            } else a.outputMsg("请填写姓名")
        }), this.get_infinite(), a.wxsq()
    }, hideEdit = function (a) {
        a ? ($(".editIcon").addClass("nosee"), this.hideEditState = !0) : ($(".editIcon").removeClass("nosee"), this.hideEditState = !1)
    }, otherAction = function (a) {
        this.otherState = a;
        for (var b in this.otherState) "chat_state" == b ? this.otherState[b] ? ($(".chat_dis").removeClass("nosee"), $("#giftModule").removeClass("nosee")) : ($(".chat_dis").addClass("nosee"), $("#giftModule").addClass("nosee")) : "chat_entry" == b ? this.otherState[b] ? $(".c_txt ").removeClass("noAction") : $(".c_txt ").addClass("noAction") : "chat_gift" == b ? this.otherState[b] ? $("#giftShow").parent().removeClass("nobody") : $("#giftShow").parent().addClass("nobody") : "chat_cash" == b && (this.otherState[b] ? $("#priceShow").parent().removeClass("nobody") : $("#priceShow").parent().addClass("nobody"))
    }, guestPageHide = function (a) {
        var b = this;
        b.guestState = a, this.result.page.forEach(function (a, c) {
            a.layout.layTemplate && (b.guests.no = c, b.guests.html = a)
        }), b.guestState ? (b.guestState = !1, b.delPage(b.guests.no), $("#chat_msg").show(), $("#chat_msg").css("opacity", 1)) : (b.addPage(b.guests.html, "guestPageHide"), $("#chat_msg").hide(), $("#chat_msg").css("opacity", 0), $(".mapSeat").attr("src", b.mapSrc)), "0px" == $("#lastAbout").css("top") && ($("#lastAbout").css({
            top: b.height + "px"
        }), b.lastState = !1, b.lastDown = !0)
    }, get_infinite = function () {
        var a, b, c, d;
        for (this.infiniteArr.length > 0 ? this.infiniteArr = [] : null, a = 0; a < this.result.page.length; a++)
            for (b = 0; b < this.result.page[a].layout.elements.length; b++) this.result.page[a].layout.elements[b].infinite && (c = {}, d = this.result.page[a].layout.elements, c.page_id = this.result.page[a].id, c.id = d[b].id || Math.round(1e16 * Math.random()), c.infinite = d[b].infinite, c.inf_duration = d[b].inf_duration || "1000ms", c.inf_delay = d[b].inf_delay || "0ms", c.delay = d[b].delay || "0ms", c.duration = d[b].duration || "1000ms", c.animate = d[b].animate, this.infiniteArr.push(c))
    }, getGifts_replies = function (a) {
        var b = this;
        $.ajax({
            url: '/婚礼纪_files/gifts_and_replies.json',
            type: "get",
            success: function (c) {
                0 == c.status.RetCode && (b.gifts = c.data.gifts, b.replies = c.data.replies, b.user_name = c.data.user_name, b.user_id = c.data.user_id, a && b.chatMsg(1), $("#scrollBox2") && b.giftsMarquee())
            }
        })
    }, selectGift = function () {
        function l() {
            a.innerHTML = '<div class="giftTit" style="padding:' + 26 / d.UI_WIDTH * d.width + 'px 0"><div class="entryName" style="width:' + 626 / d.UI_WIDTH * d.width + "px;padding: " + 20 / d.UI_WIDTH * d.width + "px " + 30 / d.UI_WIDTH * d.width + "px;font-size:" + 28 / d.UI_WIDTH * d.width + 'px"><div><em>赠送人：</em><input style="line-height: ' + 40 / d.UI_WIDTH * d.width + 'px" id="nameTxt" class="ak" type="text" value="请输入您的姓名"/></div></div></div><div class="gift_main" style="padding-top:' + 32 / d.UI_WIDTH * d.width + 'px;"><div id ="giftMore" class="gift_box" style="width:' + 686 / d.UI_WIDTH * d.width + 'px"><ul id="g_bd_wrap" style="width:' + 750 / d.UI_WIDTH * d.width * Math.ceil(f.length / 8) + 'px;overflow:hidden">' + c + '</ul></div><div class="pageGift" style="padding-bottom: ' + 38 / d.UI_WIDTH * d.width + 'px"></div><div class="gift_footer" style="border-top: 1px solid #e7e7e7;overflow: hidden;padding: ' + 28 / d.UI_WIDTH * d.width + 'px"><div class="gift_tishi" style="overflow: hidden;float: left;width:' + 450 / d.UI_WIDTH * d.width + "px;height: " + 78 / d.UI_WIDTH * d.width + 'px;margin: 0"><img style="width:' + 338 / d.UI_WIDTH * d.width + "px;height: " + 78 / d.UI_WIDTH * d.width + 'px;" src="http://qnm.hunliji.com/o_1bqf7v9454h1fjm1f2f1kmt1tguc.jpg"/></div><div id="sendGiftBtn" style="float: right;width: ' + 190 / d.UI_WIDTH * d.width + "px;height:" + 80 / d.UI_WIDTH * d.width + "px;line-height:" + 80 / d.UI_WIDTH * d.width + 'px">赠送礼物</div></div></div>', document.getElementById("other").appendChild(a), $(".g_bd").css({
                width: 750 / d.UI_WIDTH * d.width,
                padding: "0 " + 20 / d.UI_WIDTH * d.width + "px",
                "box-sizing": "border-box"
            }), $(".g_layout").css({
                padding: 10 / d.UI_WIDTH * d.width
            }), $(".g_layout").eq(d.giftSeat).find("span").addClass("ap"), d.isIphoneX() && $(".gift_main").css({
                "padding-bottom": "34px"
            }), d.giftProperty = {
                id: $(".g_layout").eq(d.giftSeat).find("span").attr("cid"),
                title: $(".g_layout").eq(d.giftSeat).find("span").attr("title"),
                price: $(".g_layout").eq(d.giftSeat).find("span").attr("price")
            }
        }

        function m() {
            var a, b, c;
            for (a = 0; a < $(".g_bd").length; a++) a > 1 && $(".g_bd").eq(a).hide();
            for (b = 0, c = ""; b < Math.ceil($(".g_bd").length);) c += "<i></i>", b++;
            $(".pageGift").append(c), $(".pageGift").find("i").eq(0).addClass("ko"), $(".pageGift i").length <= 1 && $(".pageGift").hide()
        }

        var f, g, h, i, j, k, a = document.createElement("div"),
            b = document.createElement("div"),
            c = "",
            d = this;
        for (a.setAttribute("id", "send_gift"), b.setAttribute("class", "bgc"), document.getElementById("other").appendChild(b), b.style.webkitTransform = "translateY(" + d.height + "px)", a.style.webkitTransform = "translateY(" + d.height + "px)", a.style.bottom = 0, a.style.width = "100%", f = d.allGifts, g = "", h = "", i = 0, j = 0, arr = [1, 2, 3, 4, 5, 6, 7, 9, 10, 11, 12, 13, 14, 15, 17, 18], k = 0; k < f.length; k++) 8 > i && f[k].icon2 && (g += '<div class="g_layout " style="width: 25%;box-sizing: border-box">                              <span price="' + f[k].price + '" title="' + f[k].title + '" cid="' + f[k].id + '"><img src="' + f[k].icon2 + '?imageView2/1/w/200/h/200"/></span>                          </div>', i++, j++, i > 7 ? (i = 0, h = '<li class="g_bd">' + g + "</li>", g = "", c += h) : arr.indexOf(j) > -1 && f.length == j && (h = '<li class="g_bd">' + g + "</li>", g = "", c += h));
        setTimeout(function () {
            l(), m(), d.gift_action()
        }, 300)
    }, gift_action = function () {
        var a = new Hammer(document.getElementById("giftMore")),
            b = this;
        a.on("swipe", function (a) {
            function c(a) {
                $("#g_bd_wrap").css({
                    "-webkit-transform": "translate3d(" + -(750 / b.UI_WIDTH * b.width) * a + "px, 0px, 0px)",
                    "-webkit-transition": "-webkit-transform 350ms cubic-bezier(0.42, 0, 0.58, 1.0)"
                })
            }

            a.deltaX > 0 && b.gift_touchSeat > 0 ? b.gift_touchSeat-- : a.deltaX < 0 && b.gift_touchSeat < Math.ceil($(".g_bd").length) - 1 && b.gift_touchSeat++, $(".pageGift i").removeClass("ko"), $(".pageGift i").eq(b.gift_touchSeat).addClass("ko"), c(b.gift_touchSeat)
        })
    }, chatMsg = function (a) {
        function q(a) {
            a && d.length > 1 && ($("#giftModule").remove(), r(), $(".chat_dis").css({
                maxHeight: "none"
            }), $(".chat_dis").css({
                height: 3 * g + 12 + "px"
            }), b.chatNo = 0, b.chatSeat = 0, $(".bd").empty().css({
                "-webkit-transform": "translateY(0)"
            }).append(j), clearTimeout(b.t), clearTimeout(b.tc)), b.chatSeat < d.length - 2 ? b.chatSeat++ : (b.chatSeat = 0, $(".bd").append(j)), d.length > 1 && ($(".chat_dis").addClass("kid"), $(".bd").css({
                "-webkit-transform": "translateY(-" + Number(g + 6) * b.chatNo + "px)"
            }), b.chatNo++, b.tc = setTimeout(q, 2600))
        }

        function r(a) {
            function k() {
                b.gift_m < h.timeNum ? (b.gift_m++, b.gift_t = setTimeout(k, 1e3)) : (b.gift_m = 0, clearTimeout(b.gift_t), r(!0))
            }

            function l() {
                i = c[j].card_gift ? '<div class="animated gift_layout gy" style="padding:' + h.p8 / b.UI_WIDTH * b.width + "px;margin-bottom:" + (h.p8 / b.UI_WIDTH * b.width + 5) + "px;border-radius:" + h.gH / b.UI_WIDTH * b.width + 'px;padding-right:10px;">                              <div class="giftBd" style="height:' + h.gH / b.UI_WIDTH * b.width + 'px;">                                <div class="g_y"><span style="height:' + h.gH / b.UI_WIDTH * b.width + "px;width:" + h.gH / b.UI_WIDTH * b.width + "px;border-radius:" + h.gH / b.UI_WIDTH * b.width + 'px"><img src="' + c[j].card_gift.icon + '"/></span></div>                                <div class="g_y">                                  <h5><i style="font-weight:700">' + c[j].giver_name + "</i> 送了 " + c[j].card_gift.title + "</h5>                                  <p>" + c[j].card_gift.desc + "</p>                                </div>                              </div>                          </div>" : '<div class="animated gift_layout" style="padding:' + h.p8 / b.UI_WIDTH * b.width + "px;margin-bottom:" + (h.p8 / b.UI_WIDTH * b.width + 5) + "px;border-radius:" + h.gH / b.UI_WIDTH * b.width + 'px;padding-right:10px;">                              <div class="giftBd" style="height:' + h.gH / b.UI_WIDTH * b.width + 'px;">                                <div class="g_y"><span style="width:' + h.gH / b.UI_WIDTH * b.width + 'px"><img src="//qnm.hunliji.com/o_1bil5lgmqq2j1mgck6ntad18b7.png"/></span></div>                                <div class="g_y">                                  <h5>' + c[j].giver_name + "</h5>                                  <p>送了" + c[j].price + "元红包</p>                                </div>                              </div>                          </div>", b.replies.length > 1 && $(".chat_dis").addClass("kid"), $(".chat_dis").before('<div id="giftModule" style="top:' + (b.replies.length <= 1 ? "-50" : "-16") + "px;left:" + 20 / b.UI_WIDTH * b.width + 'px" class="' + (b.otherState.chat_state ? "" : "nosee") + '" >' + i + "</div>"), $(".gift_layout").css({
                    "-webkit-transform": "translateX(-" + Number($(".gift_layout").width() + 20) + "px);"
                }), b.gt = setTimeout(function () {
                    $(".gift_layout").css({
                        opacity: 1,
                        "-webkit-transform": "translateX(0px);"
                    })
                }, 1e3), b.gta = setTimeout(function () {
                    $(".gift_layout").css({
                        opacity: 0,
                        "-webkit-transform": "translateY(-10px);"
                    }), b.gtb = setTimeout(function () {
                        clearTimeout(b.gt), clearTimeout(b.gta), clearTimeout(b.gtb), $("#giftModule").remove(), r()
                    }, 600)
                }, 3e3)
            }

            var e, f, h, i, j;
            if (0 != b.gift_m || b.seating <= 0 || b.seating >= b.result.page.length - 1) return !1;
            if (e = c.length > 0 ? !0 : !1, f = $("#giftModule").length <= 0 ? !0 : !1, h = {}, h.gH = 80, h.p8 = 8, h.timeNum = 6, d.length > 1 && $(".chat_dis").css({
                    height: 3 * g + 12 + "px"
                }), e && f || a)
                if (i = "", j = b.giftSeat, j < c.length - 1) j++, l(), b.giftSeat = j;
                else if (j = 0, l(), b.giftSeat = j, c.length <= 3) return k(), !1
        }

        var j, k, l, m, p, b = this,
            c = b.gifts,
            d = b.replies,
            e = document.createElement("div"),
            f = 20 / this.UI_WIDTH * this.width,
            g = 48 / this.UI_WIDTH * this.width,
            h = 72 / this.UI_WIDTH * this.width;
        return Number(h - 16) / 2, e.setAttribute("id", "chat_msg"), e.setAttribute("class", "fadeIn"), e.style.padding = f + "px", j = "", k = "", l = "kid", k = 3 * g + 12, b.replies.length <= 1 && (l = "", k = g), d.forEach(function (a) {
            j += '<div class="c_g" style="border-radius:' + g + "px;height:" + g + "px;line-height:" + g + 'px"><p style="border-radius:' + g + "px;height:" + g + "px;line-height:" + g + 'px"><span>' + a.name + "：</span><em>" + a.wish_language + "</em></p></div>"
        }), e.innerHTML = '<div>                              <div class="chat_dis ' + l + ' nosee" style="height:' + k + 'px;overflow:hidden;"><div class="bd">' + j + '</div></div>                              <div class="chat_entry" style="height:' + h + "px;line-height:" + h + 'px">                                <div class="c_txt noAction" style="line-height:' + h + "px;border-radius:" + h + 'px"><div id="wishTxt"><span id="chatEntry" >请留下你的祝福...</span></div></div>                                <div class="c_icon">                                  <div class="nobody"><span id="giftShow"  style="width:' + h + 'px"><img src="//qnm.hunliji.com/o_1bii7h2dc5tuu1i1op66o91lom7.png"/></span></div>                                  <div class="nobody"><span id="priceShow" style="width:' + h + 'px"><img src="//qnm.hunliji.com/o_1bii7hcgn10m4bvj1qto1uai1tetc.png"/></span></div>                                </div>                              </div>                            </div>', m = 30 / b.UI_WIDTH * b.width, 140 / b.UI_WIDTH * b.width, 64 / b.UI_WIDTH * b.width, p = '<div id="allCode_bg" style="-webkit-transform:translateY(' + b.height + 'px);"></div><div id="allCode" style="padding:0 ' + m + "px 0 " + m + 'px; ">                                <div class="ac_wish"><i>祝福</i><textarea class="ac_wish_txt" style=" resize: none;margin: ' + 30 / b.UI_WIDTH * b.width + "px 0 " + 30 / b.UI_WIDTH * b.width + "px 0;height: " + 128 / b.UI_WIDTH * b.width + "px;vertical-align: -webkit-baseline-middle;border: 0;background: #f2f3f7;width: " + 600 / b.UI_WIDTH * b.width + "px;border-radius: " + 10 / b.UI_WIDTH * b.width + "px;box-sizing: border-box;padding: " + 24 / b.UI_WIDTH * b.width + 'px;" type="text" value="请留下你的祝福..."/></div>                                <div class="ac_name">                                  <div class="ac_name_bd"><i>姓名</i><textarea class="ac_name_txt" style="overflow: hidden;resize: none;margin: ' + 30 / b.UI_WIDTH * b.width + "px 0 " + 30 / b.UI_WIDTH * b.width + "px 0;height: " + 82 / b.UI_WIDTH * b.width + "px;vertical-align: -webkit-baseline-middle;border: 0;background: #f2f3f7;width: " + 460 / b.UI_WIDTH * b.width + "px;border-radius: " + 10 / b.UI_WIDTH * b.width + "px;box-sizing: border-box;padding: " + 24 / b.UI_WIDTH * b.width + 'px;" type="text" value="请输入您的姓名..."/></div>                                  <div class="ac_name_btn"><span class="sureBtn" style="width:' + 120 / b.UI_WIDTH * b.width + "px;height:" + 82 / b.UI_WIDTH * b.width + "px;line-height:" + 82 / b.UI_WIDTH * b.width + 'px">发送</span></div>                                </div></div>', $("#allCode").length <= 0 ? $("body").append(p) : null, $(".ac_wish_txt").val("请留下你的祝福..."), $(".ac_name_txt").val("请输入您的姓名..."), b.isIphoneX() && $("#allCode").css({
            "padding-bottom": "34px"
        }), b.seating > 0 && b.seating <= b.result.page.length - 1 && !$(".layout").eq(b.seating).hasClass("guestPage") ? ($("#giftModule").length <= 0 && setTimeout(r, 600), $("#chat_msg").length <= 0 && !b.type ? (document.getElementById("wrap").appendChild(e), b.isIphoneX() && $("#chat_msg").css({
            bottom: "34px"
        }), d.length <= 1 && b.otherState.chat_state && b.otherState.chat_entry ? ($(".chat_dis").removeClass("nosee"), $(".c_txt ").removeClass("noAction"), $(".chat_dis").css({
            "max-height": g
        })) : b.t = setTimeout(q, 1e3), setTimeout(function () {
            b.otherAction({
                chat_state: 1 == b.result.cardInfo.set_up.danmu ? !0 : !1,
                chat_entry: 1 == b.result.cardInfo.set_up.wish ? !0 : !1,
                chat_gift: 1 == b.result.cardInfo.set_up.gift ? !0 : !1,
                chat_cash: 1 == b.result.cardInfo.set_up.gold ? !0 : !1
            })
        }, 1e3)) : $("#chat_msg").css("opacity", 1), 0 == b.chatTime && (b.chatTime = !0, b.t = setTimeout(q, 1e3)), $("#chat_msg").show(), a && q(1), void 0) : ($("#chat_msg").hide(), b.chatTime = !1, $("#chat_msg").length >= 1 && (clearTimeout(b.t), clearTimeout(b.tc), $("#chat_msg").css("opacity", 0)), !1)
    }, winMsg = function (a) {
        var g, h, i, j, k, l, m, n, c = document.createElement("div"),
            d = "",
            e = this,
            f = document.createElement("div");
        if (f.setAttribute("class", "winBg"), c.setAttribute("class", "winMsg"), c.style.width = 480 / this.UI_WIDTH * this.width + "px", c.style.top = 350 / this.UI_WIDTH * this.width + "px", c.style.paddingBottom = 45 / this.UI_WIDTH * this.width + "px", g = 65 / this.UI_WIDTH * this.width + "px", h = 34 / this.UI_WIDTH * this.width + "px", i = 32 / this.UI_WIDTH * this.width + "px", j = 72 / this.UI_WIDTH * this.width + "px", k = 45 / this.UI_WIDTH * this.width + "px", l = 20 / this.UI_WIDTH * this.width + "px", m = 25 / this.UI_WIDTH * this.width + "px", e.getCookie("cardPrice") || e.getCookie("cardGift")) d = '<div id="iknow" class="winMsgBtn" style="margin-top:' + k + ";font-size:" + i + ";height:" + j + ";line-height:" + j + '">知道啦</div>';
        else {
            for (n in e.otherState) "chat_gift" == n ? this.otherState[n] && (d += '<div id="' + a.giftID + '" class="winMsgBtn" style="margin-top:' + k + ";font-size:" + i + ";height:" + j + ";line-height:" + j + '">' + a.giftCol + "</div>") : "chat_cash" == n && this.otherState[n] && (d += '<div id="' + a.cashID + '" class="winMsgBtn" style="margin-top:' + l + ";font-size:" + i + ";height:" + j + ";line-height:" + j + '">' + a.cashCol + "</div>");
            ("" == d || e.fy) && (e.fy = !1, d = '<div id="iknow" class="winMsgBtn" style="margin-top:' + k + ";font-size:" + i + ";height:" + j + ";line-height:" + j + '">知道啦</div>')
        }
        (1 == e.send_state || 2 == e.send_state) && (d = "", e.otherState.chat_gift && (d += '<div id="' + a.giftID + '" class="winMsgBtn" style="margin-top:' + k + ";font-size:" + i + ";height:" + j + ";line-height:" + j + '">' + a.giftCol + "</div>"), e.otherState.chat_cash && (d += '<div id="' + a.cashID + '" class="winMsgBtn" style="margin-top:' + l + ";font-size:" + i + ";height:" + j + ";line-height:" + j + '">' + a.cashCol + "</div>"), "" == d && (d = '<div id="iknow" class="winMsgBtn" style="margin-top:' + k + ";font-size:" + i + ";height:" + j + ";line-height:" + j + '">知道啦</div>')), c.innerHTML = '<i class="closedBtn"></i><img style="margin-top:' + g + '" src="' + a.img + '"/><span style="margin-top:' + m + ";font-size:" + h + '">' + a.disMsg + "</span>" + d, document.body.appendChild(c), document.body.appendChild(f), $(document).on("touchstart", "#iknow,#giftBtnWin,#cashBtnWin", function () {
            $(".winMsg").remove(), $(".winBg").remove(), $("#allCode_bg").css({
                "-webkit-transform": "translateY(" + e.height + "px)"
            })
        }), $(document).on("touchstart", ".closedBtn", function () {
            $(".winMsg").remove(), $(".winBg").remove(), $("#allCode_bg").css({
                "-webkit-transform": "translateY(" + e.height + "px)"
            }), !e.is_get_confirm && e.CardRepliesV2_id && e.wxsq_event("CardRepliesV2", e.CardRepliesV2_id)
        }), $(document).on("touchstart", "#giftBtnWin", function () {
            return $("#giftShow").parent().hasClass("nobody") ? !1 : (e.sdkData({
                action: "giftBtnWin",
                eventable_type: "Card",
                additional: {
                    ip: e.ip,
                    card_id: e.card_id,
                    num: e.rans(32)
                }
            }), "" != e.send_name && $("#nameTxt").val(e.send_name), $("#send_gift").css("-webkit-transform", "translateY(0)"), $(".bgc").css("-webkit-transform", "translateY(0)"), void 0)
        }), $(document).on("touchstart", "#cashBtnWin", function () {
            return $("#priceShow").parent().hasClass("nobody") ? !1 : (e.sdkData({
                action: "cashBtnWin",
                eventable_type: "Card",
                additional: {
                    ip: e.ip,
                    card_id: e.card_id,
                    num: e.rans(32)
                }
            }), "" != e.send_name && $(".red_packets_name_txt").val(e.send_name), $("#red_packets_bg").removeClass("hide").css({
                zIndex: "12",
                opacity: 1
            }), $("#red_packets_form").removeClass("hide").css({
                zIndex: "12",
                opacity: 1
            }), $(".money").css({
                "-webkit-animation": "money 1000ms ease-in-out 100ms both"
            }), void 0)
        })
    }, outputMsg = function (a, b) {
        if ($(".msgWin").length > 0) return !1;
        var c = document.createElement("div");
        b && (c.style.width = "60%", c.style.background = "rgba(0,0,0,.6)"), c.style.zIndex = 999, c.setAttribute("class", "msgWin"), c.innerHTML = "<p>" + a + "</p>", document.getElementById("other").appendChild(c), setTimeout(function () {
            b || $(".msgWin").remove()
        }, 1500)
    }, loadAnimate = function (a) {
        function h(a) {
            g.save(), g.strokeStyle = "#fca7a7", g.lineWidth = 16, g.beginPath(), g.arc(b.cx / 2, b.cy / 2, b.cr, -Math.PI / 2, -Math.PI / 2 + d * a + .5, !1), g.stroke(), g.restore()
        }

        function i() {
            if (g.clearRect(0, 0, canvas.width, canvas.height), h(c), 100 > c) c += .2;
            else if (a) return $("#canvas").remove(), a(), !1;
            setTimeout(i, b.speed)
        }

        var e, f, g, b = {},
            c = 1,
            d = 2 * Math.PI / 100;
        b.cx = 200, b.cy = 200, b.cr = 60, b.speed = 1, e = document.createElement("div"), f = document.createElement("canvas"), g = f.getContext("2d"), e.setAttribute("id", "canvasBox"), e.style.width = 100 / this.UI_WIDTH * this.width + "px", e.style.height = 100 / this.UI_WIDTH * this.width + "px", f.style.position = "absolute", f.style.margin = "auto", f.style.top = "0", f.style.right = "0", f.style.bottom = "0", f.style.left = "0", f.style.zIndex = "9", f.setAttribute("width", b.cx), f.setAttribute("height", b.cy), f.setAttribute("id", "canvas"), document.body.appendChild(e), document.getElementById("canvasBox").appendChild(f), i()
    }, allImg = function (a) {
        var c, d, e, b = ["//qnm.hunliji.com/o_1bid6p3ojgs8uptnu919pd5os7.png", "//qnm.hunliji.com/o_1bke091mk1p7jimp192lvqrkl87.png"];
        for (c = 0; c < a.page.length; c++)
            for (d = 0; d < a.page[c].layout.elements.length; d++) a.page[c].layout.elements[d].img && (e = a.page[c].layout.elements[d].img, b.push(e));
        this.loading(b, function () {
            console.log("ok")
        })
    }, loading = function (a, b) {
        var d, e, c = 0;
        for (d = 0; d < a.length; d++) a[d] || a.splice(d, 1), e = new Image, e.onload = function () {
            c++, c >= a.length && b && b()
        }, e.src = a[d]
    }, rov_infinite = function (a) {
        var b, c, d, e, f;
        for (this.timeAni ? clearTimeout(this.timeAni) : null, b = this, c = b.infiniteArr, d = c.length, e = b.seating, a > 0 ? e++ : e--, f = 0; d > f; f++) c[f].page_id == this.result.page[this.seating].id && $(".ani_" + b.result.page[b.seating].id + "_" + c[f].id).hasClass("infinite") && ($(".ani_" + b.result.page[b.seating].id + "_" + c[f].id).removeClass(c[f].infinite), $(".ani_" + b.result.page[b.seating].id + "_" + c[f].id).removeClass("infinite"), $(".ani_" + b.result.page[b.seating].id + "_" + c[f].id).css({
            "-webkit-animation-delay": c[f].delay
        }), $(".ani_" + b.result.page[b.seating].id + "_" + c[f].id).css({
            "-webkit-animation-duration": c[f].duration
        }), $(".ani_" + b.result.page[b.seating].id + "_" + c[f].id).addClass(c[f].animate)), f >= d - 1 && (b.timeAni = setTimeout(function () {
            b.add_infinite()
        }, 1600))
    }, add_infinite = function () {
        var e, a = this,
            b = this.infiniteArr,
            c = b.length;
        for ($(".animated"), a.timeAni ? clearTimeout(a.timeAni) : null, e = 0; c > e; e++) a.result.page[a.seating].id == b[e].page_id && void 0 != b[e].page_id && ($(".ani_" + a.result.page[a.seating].id + "_" + b[e].id).removeClass(b[e].animate), $(".ani_" + a.result.page[a.seating].id + "_" + b[e].id).addClass(b[e].infinite), $(".ani_" + a.result.page[a.seating].id + "_" + b[e].id).addClass("infinite"), $(".ani_" + a.result.page[a.seating].id + "_" + b[e].id).css({
            "-webkit-animation-duration": b[e].inf_duration
        }), $(".ani_" + a.result.page[a.seating].id + "_" + b[e].id).css({
            "-webkit-animation-delay": b[e].inf_delay
        }))
    }, addStyle = function (a, b) {
        var g, h, c = document.createElement("style"),
            d = "",
            e = "linear";
        switch (a.infinite) {
            case "animate_leftTop":
                d = "leftTop_rotate", e = "ease-in-out";
                break;
            case "animate_leftBottom":
                d = "leftBottom_rotate", e = "ease-in-out";
                break;
            case "animate_rightTop":
                d = "rightTop_rotate", e = "ease-in-out";
                break;
            case "animate_rightBottom":
                d = "rightBottom_rotate", e = "ease-in-out";
                break;
            case "rotate":
                d = "rotate";
                break;
            case "bounce":
                d = "bounce";
                break;
            case "flash":
                d = "flash";
                break;
            case "pulse":
                d = "pulse";
                break;
            case "rubberBand":
                d = "rubberBand";
                break;
            case "shake":
                d = "shake";
                break;
            case "headShake":
                d = "headShake";
                break;
            case "swing":
                d = "swing";
                break;
            case "tada":
                d = "tada";
                break;
            case "wobble":
                d = "wobble";
                break;
            case "jello":
                d = "jello";
                break;
            case "bounceIn":
                d = "bounceIn";
                break;
            case "bounceInDown":
                d = "bounceInDown";
                break;
            case "bounceInLeft":
                d = "bounceInLeft";
                break;
            case "bounceInRight":
                d = "bounceInRight";
                break;
            case "bounceInUp":
                d = "bounceInUp";
                break;
            case "bounceOut":
                d = "bounceOut";
                break;
            case "bounceOutDown":
                d = "bounceOutDown";
                break;
            case "bounceOutLeft":
                d = "bounceOutLeft";
                break;
            case "bounceOutRight":
                d = "bounceOutRight";
                break;
            case "bounceOutUp":
                d = "bounceOutUp";
                break;
            case "fadeIn":
                d = "fadeIn";
                break;
            case "fadeInDown":
                d = "fadeInDown";
                break;
            case "fadeInDownBig":
                d = "fadeInDownBig";
                break;
            case "fadeInLeft":
                d = "fadeInLeft";
                break;
            case "fadeInLeftBig":
                d = "fadeInLeftBig";
                break;
            case "fadeInRighting":
                d = "fadeInRight";
                break;
            case "fadeInRightBig":
                d = "fadeInRightBig";
                break;
            case "fadeInUp":
                d = "fadeInUp";
                break;
            case "fadeInUpBig":
                d = "fadeInUpBig";
                break;
            case "fadeOut":
                d = "fadeOut";
                break;
            case "fadeOutDown":
                d = "fadeOutDown";
                break;
            case "fadeOutDownBig":
                d = "fadeOutDownBig";
                break;
            case "fadeOutLeft":
                d = "fadeOutLeft";
                break;
            case "fadeOutLeftBig":
                d = "fadeOutLeftBig";
                break;
            case "fadeOutRight":
                d = "fadeOutRight";
                break;
            case "fadeOutRightBig":
                d = "fadeOutRightBig";
                break;
            case "fadeOutUp":
                d = "fadeOutUp";
                break;
            case "fadeOutUpBig":
                d = "fadeOutUpBig";
                break;
            case "flipInX":
                d = "flipInX";
                break;
            case "flipInY":
                d = "flipInY";
                break;
            case "flipOutX":
                d = "flipOutX";
                break;
            case "flipOutY":
                d = "flipOutY";
                break;
            case "lightSpeedIn":
                d = "lightSpeedIn";
                break;
            case "lightSpeedOut":
                d = "lightSpeedOut";
                break;
            case "rotateIn":
                d = "rotateIn";
                break;
            case "rotateInDownLeft":
                d = "rotateInDownLeft";
                break;
            case "rotateInDownRight":
                d = "rotateInDownRight";
                break;
            case "rotateInUpLeft":
                d = "rotateInUpLeft";
                break;
            case "rotateInUpRight":
                d = "rotateInUpRight";
                break;
            case "hinge":
                d = "hinge";
                break;
            case "jackInTheBox":
                d = "jackInTheBox";
                break;
            case "rollIn":
                d = "rollIn";
                break;
            case "rollOut":
                d = "rollOut";
                break;
            case "zoomIn":
                d = "zoomIn";
                break;
            case "zoomInDown":
                d = "zoomInDown";
                break;
            case "zoomInLeft":
                d = "zoomInLeft";
                break;
            case "zoomInRight":
                d = "zoomInRight";
                break;
            case "zoomInUp":
                d = "zoomInUp";
                break;
            case "zoomOut":
                d = "zoomOut";
                break;
            case "zoomOutDown":
                d = "zoomOutDown";
                break;
            case "zoomOutLeft":
                d = "zoomOutLeft";
                break;
            case "zoomOutRight":
                d = "zoomOutRight";
                break;
            case "zoomOutUp":
                d = "zoomOutUp";
                break;
            case "slideInDown":
                d = "slideInDown";
                break;
            case "slideInLeft":
                d = "slideInLeft";
                break;
            case "slideInRight":
                d = "slideInRight";
                break;
            case "slideInUp":
                d = "slideInUp";
                break;
            case "slideOutDown":
                d = "slideOutDown";
                break;
            case "slideOutLeft":
                d = "slideOutLeft";
                break;
            case "slideOutRight":
                d = "slideOutRight";
                break;
            case "slideOutUp":
                d = "slideOutUp";
                break;
            case "fadeInNormal":
                d = "fadeInNormal", a.animationDuration[b.indexOf("fadeInNormal")] = "1000";
                break;
            case "pullDown":
                d = "pullDown", a.animationDuration[b.indexOf("pullDown")] = "1000"
        }
        if ((!a.animationDuration || a.animationDuration.indexOf("0") > -1 || a.animationDuration.indexOf("0ms") > -1 || a.animationDuration.indexOf("ms") > -1 || a.animationDuration.indexOf("") > -1) && (b.indexOf("fadeInNormal") > -1 ? a.animationDuration[b.indexOf("fadeInNormal")] = "1000ms" : b.indexOf("slideLeft") > -1 ? a.animationDuration[b.indexOf("slideLeft")] = "1000ms" : b.indexOf("bounceInRight") > -1 ? a.animationDuration[b.indexOf("bounceInRight")] = "1000ms" : b.indexOf("stretchLeft") > -1 ? a.animationDuration[b.indexOf("stretchLeft")] = "1000ms" : b.indexOf("fadeIn") > -1 ? a.animationDuration[b.indexOf("fadeIn")] = "1000ms" : b.indexOf("bounceInLeft") > -1 ? a.animationDuration[b.indexOf("bounceInLeft")] = "1000ms" : b.indexOf("stretchRight") > -1 && (a.animationDuration[b.indexOf("stretchRight")] = "1000ms")), a.animationDuration.indexOf("0") > -1 ? a.animationDuration[a.animationDuration.indexOf("0")] = "1000ms" : a.animationDuration.indexOf("0ms") > -1 ? a.animationDuration[a.animationDuration.indexOf("0ms")] = "1000ms" : a.animationDuration.indexOf("ms") > -1 ? a.animationDuration[a.animationDuration.indexOf("ms")] = "1000ms" : a.animationDuration.indexOf("") > -1 && (a.animationDuration[a.animationDuration.indexOf("")] = "1000ms"), "" != d && (d = "," + d + " " + a.inf_duration + " " + e + " " + a.inf_delay + " forwards infinite"), g = [], Array.isArray(b)) {
            for (h = 0; h < b.length; h++) "ms" == a.animationDelay[h] ? a.animationDelay[h] = "0ms" : a.animationDelay[h] && a.animationDelay[h].indexOf("ms") <= "-1" && (a.animationDelay[h] = a.animationDelay[h] + "ms"), "ms" == a.animationDuration[h] ? a.animationDuration[h] = "0ms" : a.animationDuration[h] && a.animationDuration[h].indexOf("ms") <= "-1" && (a.animationDuration[h] = a.animationDuration[h] + "ms"), 0 == h ? g.push(b[h] + " " + a.animationDuration[h] + " ease-in-out " + a.animationDelay[h] + " both 1" + d) : g.push(b[h] + " " + a.animationDuration[h] + " ease-in-out " + a.animationDelay[h] + " forwards 1" + d);
            c.innerHTML = ".ani_" + a.page_id + "_" + a.id + " {-webkit-animation:" + g.join(",") + "; }"
        } else c.innerHTML = ".ani_" + a.page_id + "_" + a.id + " {-webkit-animation:" + b + " " + a.animationDuration + " ease-in-out " + a.animationDelay + " both 1" + d + "; }";
        document.getElementById("other").appendChild(c)
    }, createPage = function (a) {
        console.log(55555);
        var b = this,
            c = b.UI_WIDTH,
            d = b.UI_HEIGHT,
            e = b.width,
            f = b.height;
        return this.allPage = a.map(function (a, g) {
            var i, j, k, l, h = "";
            return a.layout.layTemplate ? b.guestsPage(a, g) : null, a.layout.elements.forEach(function (i, j) {
                var k, l, m, n, o, p, q, r, s, t, v, w, x;
                i.video_path ? b.videoNext = g - 1 : null, k = Number(i.y / c) * e, l = "", 1 == i.is_scale && (k = Number(i.y / d) * f), i.mask && (l = "-webkit-mask-image:url(" + i.mask.img + ");-webkit-mask-size:100% 100%;"), m = {
                    width: Number(i.width / c) * e + "px",
                    height: Number(i.height / c) * e + "px",
                    left: Number(i.x / c) * e + "px",
                    top: k + "px",
                    zIndex: i.z_order,
                    animationDelay: i.delay || 0,
                    animationDuration: i.duration || 0,
                    type: i.type || null,
                    isdown: 0 == i.is_down ? !1 : !0,
                    id: i.id || Math.round(1e16 * Math.random()),
                    page_id: a.id,
                    text_type: i.text_type || null,
                    infinite: i.infinite || null,
                    mask: l,
                    inf_delay: i.inf_delay || 0,
                    inf_duration: i.inf_duration || 0,
                    edit_btn_position: i.edit_btn_position || null
                }, m.animationDelay = m.animationDelay, m.animationDuration = m.animationDuration, "ms" == m.inf_delay ? m.inf_delay = "0ms" : "" != m.inf_delay && m.inf_delay.indexOf("ms") <= "-1" && (m.inf_delay = m.inf_delay + "ms"), "ms" == m.inf_duration ? m.inf_duration = "0ms" : "" != m.inf_duration && m.inf_duration.indexOf("ms") <= "-1" && (m.inf_duration = m.inf_duration + "ms"), n = b.UI_HEIGHT - i.y - i.height, n = Number(n / b.UI_WIDTH) * e + "px", o = m.isdown ? "bottom:" + n : "top:" + m.top, p = "position:fixed;width:" + m.width + ";height:" + m.height + ";left:" + m.left + ";" + o + ";z-index:" + m.zIndex, b.positionIcon(m, o, i, j, a.layout.elements.length), q = "", r = "", i.height >= b.UI_HEIGHT && (Number(i.height / b.UI_WIDTH) * e > f && (f = Number(i.height / b.UI_WIDTH) * e), r = Math.round(i.width / i.height * b.height) - b.width, r /= 2, q = "-webkit-transform:translateX(-" + r + "px);width:auto;height:" + f + "px"), s = i.animate, t = "", m.infinite && (t = "inf=" + m.infinite), b.type ? i.original_path && "" !== i.original_path ? (i.video_path ? i.video_path : i.original_path, b.videoHave = !0, h += '<div class="videoMH nosee"></div><div id="video" class="animated ' + s + " ani_" + m.page_id + "_" + m.id + '" videoW="' + i.video_width + '" videoP="' + i.video_path + '" videoH="' + i.video_height + '" style="width:' + b.width + "px;height:" + b.height + 'px;position:relative;overflow:hidden;">                <video id="vid" class="IIV"                x-webkit-airplay="true"                 webkit-playsinline                playsinline                preload="true"                height="100%"                loop="true"                 x5-video-player-type="h5"                 x5-video-player-fullscreen="true"                 style="min-height:100%;min-width:100%;margin-left:-' + (i.video_width / i.video_height * b.height - b.width) / 2 + 'px;"                 poster="' + i.original_path + "?vframe/jpg/offset/1|imageView2/1/w/" + i.video_width + "/h/" + i.video_height + '"                 src="' + i.original_path + '"></video>              </div>') : (v = "", w = "", x = "", i.width >= 750 && i.height >= 1220 && (v = b.height + "px", w = "auto", x = (b.UI_WIDTH / b.UI_HEIGHT * b.height - b.width) / 2, 0 >= x && (w = "100%")), "map" == m.type && (v = "100%"), i.img || (i.img = ""), b.addStyle(m, s), h += "<div " + t + ' class="animated ani_' + m.page_id + "_" + m.id + '" style="' + p + '">                    ' + ("map" == m.type ? '<img class="dwIcon" src="http://qnm.hunliji.com/o_1blaaggv063m34kok21s8k1irnc.png"><div class="navigation" style="position: absolute; width: ' + 100 / b.UI_WIDTH * b.width + "px; height: " + 56 / b.UI_WIDTH * b.width + "px; right: 0; top:0; background: #7c7c7c; opacity: 0.6; color: white;font-size: " + 28 / b.UI_WIDTH * b.width + "px;line-height: " + 56 / b.UI_WIDTH * b.width + "px; text-align: center; border-bottom-left-radius: " + 5 / b.UI_WIDTH * b.width + 'px;">导航</div>' : "") + '                    <img style="' + m.mask + ";width:" + w + ";height:" + v + ";margin-left:-" + x + 'px" class="pageImg ' + ("map" == m.type ? "mapSeat" : "") + '" type="' + m.type + '" page_id="' + m.page_id + '" id="' + m.id + '" style="' + q + '" src="' + i.img + '" />                </div>') : i.video_path && "" != i.video_path ? (b.videoHave = !0, h += '<div class="videoMH nosee"></div><div id="video" class="animated ' + s + " ani_" + m.page_id + "_" + m.id + '" videoW="' + i.video_width + '" videoP="' + i.video_path + '" videoH="' + i.video_height + '" style="width:' + b.width + "px;height:" + b.height + 'px;position:relative;overflow:hidden;">                <video id="vid" class="IIV"                x-webkit-airplay="true"                 webkit-playsinline                playsinline                preload="true"                loop="true"                 x5-video-player-type="h5"                 x5-video-player-fullscreen="true"                 style="min-height:100%;min-width:100%;margin-left:-' + (i.video_width / i.video_height * b.height - b.width) / 2 + 'px;"                 poster="' + i.video_path + "?vframe/jpg/offset/1|imageView2/1/w/" + i.video_width + "/h/" + i.video_height + '"                 src="' + i.video_path + '"></video>              </div>') : "" == i.video_path && void 0 != i.video_path || null === i.video_path ? h += '<div style="position:fixed;top:0;bottom:0;left:0;right:0;background:#f2f3f6;z-index:9">                        <img class="noVideo" style="position:fixed;top:0;bottom:0;left:0;right:0; width:35%;margin:auto;" src="//qnm.hunliji.com/o_1bk442tda19uemst1jia1db31d007.png" />                    </div>' : (v = "", w = "", x = "", i.height >= 1220 && (v = b.height + "px", w = "auto", x = (b.UI_WIDTH / b.UI_HEIGHT * b.height - b.width) / 2, 0 >= x && (w = "100%")), "map" == m.type && (v = "100%"), i.img || (i.img = ""), b.addStyle(m, s), h += "<div " + t + ' class="animated ani_' + m.page_id + "_" + m.id + '" style="' + p + '">                    ' + ("map" == m.type ? '<img class="dwIcon" src="http://qnm.hunliji.com/o_1blaaggv063m34kok21s8k1irnc.png"><div class="navigation" style="position: absolute; width: ' + 100 / b.UI_WIDTH * b.width + "px; height: " + 56 / b.UI_WIDTH * b.width + "px; right: 0; top:0; background: #7c7c7c; opacity: 0.6; color: white;font-size: " + 28 / b.UI_WIDTH * b.width + "px;line-height: " + 56 / b.UI_WIDTH * b.width + "px; text-align: center; border-bottom-left-radius: " + 5 / b.UI_WIDTH * b.width + 'px;">导航</div>' : "") + '                    <img style="' + m.mask + ";width:" + w + ";height:" + v + ";margin-left:-" + x + 'px" class="pageImg ' + ("map" == m.type ? "mapSeat" : "") + '" type="' + m.type + '" page_id="' + m.page_id + '" id="' + m.id + '" style="' + q + '" src="' + i.img + '" />                </div>')
            }), i = b.height, j = 0, g <= b.seating && (i = 0, j = 1), k = "", l = "", a.layout.layTemplate && (k = "guestPage"), b.type ? '<div class="ebg ele_background_' + g + '" style="position:fixed;top:0;left:0;z-index:0;-webkit-transition-duration:600ms;opacity:' + j + '"><img style="width:' + b.width + "px;height:" + b.height + 'px;" src="' + a.layout.background + '"/></div><div id="' + k + '" page_id="' + a.id + '" style="height:' + b.height + 'px" class="layout ' + (b.seating == g ? " " : "hide ") + " " + k + '">' + l + h + "</div>" : '<div class="ebg ele_background_' + g + '" style="position:fixed;top:0;left:0;z-index:0;-webkit-transition-duration:600ms;-webkit-transform:translateY(' + i + 'px);"><img style="width:' + b.width + "px;height:" + b.height + 'px;" src="' + a.layout.background + '"/></div><div id="' + k + '" page_id="' + a.id + '" style="height:' + b.height + 'px" class="layout ' + (b.seating == g ? " " : "hide ") + " " + k + '">' + l + h + "</div>"
        })
    }, guestsPage = function (a, b) {
        var d, e, f, g, h, i, c = this;
        this.mapHave = !0, this.mapNum = b, c = this, d = {}, d.w = 686, d.h = 386, d.b = 132, d.x = this.result.cardInfo.latitude, d.y = this.result.cardInfo.longtitude, c.result.cardInfo.map_type ? 1 == c.result.cardInfo.map_type ? d.coordtype = 5 : 0 == c.result.cardInfo.map_type && (d.coordtype = 3) : d.coordtype = 3, e = document.createElement("div"), e.setAttribute("id", "map"), e.setAttribute("class", "animated fadeIn"), e.style.bottom = d.b / this.UI_WIDTH * this.width + "px", e.style.width = d.w / this.UI_WIDTH * this.width + "px", f = "//apis.map.qq.com/ws/staticmap/v2/?center=" + d.x + "," + d.y + "&zoom=12&size=686*386&maptype=roadmap&markers=size:large|color:0xFFCCFF|label:k|" + d.x + "," + d.y + "&key=QLPBZ-3O6R4-GJDUO-DITBG-UHR7K-E6B2G", c.srcMap = f, g = c.result.cardInfo.groom_name + " 和 " + c.result.cardInfo.bride_name + " 诚挚邀请", c.mapUrl = "//apis.map.qq.com/tools/poimarker?type=0&marker=coord:" + d.x + "," + d.y + ";coordtype:" + d.coordtype + ";title:" + c.result.cardInfo.place + ";addr:" + g + "&key=QLPBZ-3O6R4-GJDUO-DITBG-UHR7K-E6B2G&referer=hunliji", h = document.createElement("div"), h.setAttribute("id", "updownIcon"), h.style.bottom = 160 / this.UI_WIDTH * this.width + 34 + "px", h.innerHTML = '<img src="' + this.pageIcon + '"/>', i = document.createElement("div"), i.setAttribute("id", "guest_action"), i.setAttribute("class", "fadeIn"), i.style.bottom = 48 / c.UI_WIDTH * c.width + "px", i.innerHTML = '<p id="guestBtn" style="margin: 0 auto;width:' + 500 / c.UI_WIDTH * c.width + "px;height:" + 88 / c.UI_WIDTH * c.width + "px;line-height:" + 88 / c.UI_WIDTH * c.width + "px;border-radius: " + 44 / c.UI_WIDTH * c.width + 'px;">宾客回复</p>', setTimeout(function () {
            $("#guestPage").find("#guestBtn").length >= 1 ? console.log($("#guestPage").find("#guestBtn").length) : (document.getElementById("guestPage") && document.getElementById("guestPage").appendChild(i), c.isIphoneX() && $("#guest_action").css({
                bottom: "58px"
            }), c.type || document.getElementById("guestPage") && document.getElementById("guestPage").appendChild(h), $("#guestBtn").css({
                background: c.buttonBg,
                color: c.textColor,
                "box-shadow": "1px 1px 3px rgba(0,0,0,.35)"
            }), c.guestAction())
        }, 300)
    }, otherMap = function (a) {
        var b = this;
        $.ajax({
            url: b.API.otherMapImage + "?id=" + b.card_id,
            type: "get",
            success: function (c) {
                b.mapSrc = c.data.map_image ? b.result.cardInfo.map_image ? b.result.cardInfo.map_image : c.data.map_image ? c.data.map_image : a : b.result.cardInfo.map_image ? b.result.cardInfo.map_image : a, $(".mapSeat").attr("src", b.mapSrc)
            }
        })
    }, guestAction = function () {
        var h, k, a = document.createElement("div"),
            b = this,
            c = 1,
            d = document.createElement("div"),
            e = document.createElement("div"),
            f = null,
            g = document.body.scrollTop;
        e.style.display = "none", e.style.zIndex = "999", e.style.position = "relative", e.style.height = this.height + "px", d.style.height = this.height + "px", d.setAttribute("id", "guestBg"), a.setAttribute("id", "gusetBox"), h = 30 / b.UI_WIDTH * b.width, 140 / b.UI_WIDTH * b.width, 64 / b.UI_WIDTH * b.width, k = '<div id="gusetCode" style="padding:0 ' + h + "px 0 " + h + 'px; ">                              <div class="ac_wish"><i style="font-weight:700">您的姓名</i><input id="gusetName" class="guset_name" style="width:70%;margin-left:' + h + "px;padding:" + h + "px 0 " + h + 'px 0;" type="text" placeholder="请输入您的姓名..."/></div>                              <div class="guset_set" style="padding:' + h + "px 0 " + h + 'px 0;">                                <div style="font-weight:700">是否赴宴</div><div class="guset_icon" style="-webkit-box-flex:18"><p state=0><span class="sk">赴宴</span></p><p state=1><span>待定</span></p><p state=2><span>有事</span></p></div></div></div>', a.innerHTML = k + "<div class='send_box'>              <div class='guest_num' style='height:" + Number(100 / this.UI_WIDTH * this.width) + "px;line-height:" + Number(100 / this.UI_WIDTH * this.width) + "px'><div class='numpre'>赴宴人数</div><div><p class='disNum_col' style='width:" + Number(192 / this.UI_WIDTH * this.width) + "px;line-height:" + Number(64 / this.UI_WIDTH * this.width) + "px;height:" + Number(64 / this.UI_WIDTH * this.width) + "px'><i class='gnl addNum'>-</i><i class='disNum'>1</i><i class='gnr addNum ak'>+</i></p></div></div><div id='sendNum' style='line-height:" + Number(100 / this.UI_WIDTH * this.width) + "px'>确定</div>            </div>", e.appendChild(a), e.appendChild(d), document.getElementById("guestPage") && document.getElementById("guestPage").appendChild(e), b.isIphoneX() && $("#gusetBox").css({
            "padding-bottom": "34px",
            background: "#fff"
        }), console.log($("#gusetBox")), $("#gusetBox").css({
            bottom: "0"
        }), $(document).on("touchstart", ".guset_icon p", function () {
            var a = $(".guset_icon p").index(this);
            b.send_state = $(this).attr("state"), $(".guset_icon p span").removeClass("sk"), $(this).find("span").addClass("sk"), 1 == a || 2 == a ? ($(".guest_num div").css({
                opacity: "0"
            }), $(".guest_num .numpre").css({
                opacity: "0"
            })) : ($(".guest_num div").css({
                opacity: "1"
            }), $(".guest_num .numpre").css({
                opacity: "1"
            }))
        }), $(document).on("touchstart", "#guestBg", function () {
            var a = $(this);
            $("#gusetBox").css({
                bottom: "-200px"
            }), a.hide(), $("#gusetName").blur(), document.body.scrollTop = g, clearInterval(f), setTimeout(function () {
                e.style.display = "none", $("#guestPage").find(".animated").show(), $("#map").show(), $("#updownIcon").show()
            }, 600)
        }), $("#guestBtn").on("touchend", function () {
            return b.type ? (b.outputMsg("请先发送请帖"), !1) : ($("#updownIcon").hide(), "" != b.send_name && $("#gusetName").val(b.send_name), e.style.display = "block", setTimeout(function () {
                $("#guestBg").show(), $("#gusetBox").css({
                    bottom: 0
                })
            }), $(".disNum_col").css({
                left: $(".numpre").width() + "px"
            }), navigator.userAgent.indexOf("Android") > -1 ? setTimeout(function () {
                $("#gusetName").focus()
            }, 300) : navigator.userAgent.indexOf("iPhone") > -1 && ($("#gusetName").focus(), navigator.userAgent.indexOf("iPhone OS 11") <= -1 && (f = setInterval(function () {
                document.body.scrollTop = document.body.scrollHeight
            }, 200))), navigator.userAgent.indexOf("iPhone OS 11") <= -1 && (document.querySelector("#gusetBox").scrollIntoView(!1), document.querySelector(".send_box").scrollIntoView(!1), document.querySelector("#gusetName").scrollIntoView(!1)), void 0)
        }), $(document).on("touchend", "#gusetName", function () {
            navigator.userAgent.indexOf("iPhone OS 11") <= -1 && (document.querySelector("#gusetBox").scrollIntoView(!1), document.querySelector(".send_box").scrollIntoView(!1), document.querySelector("#gusetName").scrollIntoView(!1))
        }), $("#sendNum").on("touchstart", function () {
            return b.type ? (b.outputMsg("请先发送请帖"), !1) : ("" != $("#gusetName").val() ? (b.send_name = $("#gusetName").val(), $("#gusetBox").css({
                bottom: "-200px"
            }), $("#guestBg").hide(), setTimeout(function () {
                e.style.display = "none", $("#guestPage").find(".animated").show(), $("#map").show(), b.fy = !0, b.ajax_reply({
                    card_id: b.card_id,
                    count: 1 == b.send_state || 2 == b.send_state ? 0 : c,
                    name: b.send_name,
                    state: b.send_state
                }, null, !0), $("#gusetName").blur(), $("#updownIcon").show(), document.body.scrollTop = g, clearInterval(f)
            }, 600)) : b.outputMsg("请填写您的姓名"), void 0)
        }), $(document).on("touchstart", ".gnl", function () {
            $(".addNum").index(this), c > 1 && (c--, 1 == c ? $(".addNum").eq(0).removeClass("ak") : null), $(".disNum").text(c)
        }), $(document).on("touchstart", ".gnr", function () {
            $(".addNum").index(this), c++, $(".addNum").eq(0).addClass("ak"), $(".disNum").text(c)
        })
    }, musicStatePause = function () {
        return this.musicStatePause
    }, changeMusic = function (a) {
        var c, d, e, f, g, b = this;
        return document.getElementById("playMusic").setAttribute("src", a), "false" == this.musicStatePause && document.getElementById("playMusic").play(), null == a && $("#musicBtn").length > 0 ? ($("#musicBtn").remove(), !1) : (0 == $("#musicBtn").length && (c = document.createElement("div"), d = document.createElement("img"), e = b.musicOpen, f = b.musicClose, d.setAttribute("src", "true" != b.musicStatePause ? e : f), c.setAttribute("id", "musicBtn"), c.appendChild(d), c.style.width = 72 / b.UI_WIDTH * b.width + "px", c.style.top = 32 / b.UI_WIDTH * b.width + "px", c.style.right = 32 / b.UI_WIDTH * b.width + "px", c.style.marginTop = "0px", document.getElementById("other").appendChild(c), g = document.getElementById("playMusic"), g.addEventListener("timeupdate", function () {
            "false" == b.musicStatePause && $("#musicBtn").addClass("rotate")
        })), void 0)
    }, musicPause = function (a) {
        var b = this;
        a ? (this.musicStatePause = !0, this.writeCookie("musicStatePause", "true", 360), document.getElementById("playMusic").pause(), $("#musicBtn").removeClass("rotate"), $("#musicBtn img").attr("src", b.musicClose)) : (this.musicStatePause = !1, this.writeCookie("musicStatePause", "false", 360), document.getElementById("playMusic").play(), $("#musicBtn").addClass("rotate"), $("#musicBtn img").attr("src", b.musicOpen))
    }, changeVideo = function (a, b, c) {
        var e, f, d = this;
        b / c >= d.width / d.height ? (e = d.height * (b / c), $("#vid").css({
            "margin-left": "-" + (e - d.width) / 2 + "px",
            "margin-top": 0,
            "margin-bottom": 0,
            "margin-bottom": "-" + (e - d.width) / 2 + "px"
        })) : (f = d.width * (c / b), $("#vid").css({
            "margin-top": "-" + (f - d.height) / 2 + "px",
            "margin-left": 0,
            "margin-right": 0,
            "margin-bottom": "-" + (f - d.height) / 2 + "px"
        })), $("#vid").attr("src", a), $("#vid").attr("poster", a + "?vframe/jpg/offset/1|imageView2/1/w/" + d.width + "/h/" + d.width), document.getElementById("vid") && (document.getElementById("vid").muted = "muted", document.getElementById("vid").play()), d.result.page.forEach(function (d) {
            d.layout.elements.forEach(function (d) {
                d.video_path && (d.video_path = a, d.original_path = a, d.video_width = b, d.video_height = c)
            })
        })
    }, exchangePage = function (a, b) {
        var c = this.result.page[a],
            d = this.result.page[b];
        this.result.page[a] = d, this.result.page[b] = c, this.seatState = !0, this.seating == a ? (this.seating = b, b == this.result.page.length - 1 && (this.sortS = a)) : this.seating == b && (this.seating = a, this.exPage = a + 1)
    }, editIconState = function (a) {
        var d, b = this,
            c = $(".editIcon");
        if (!b.type && !b.getParams("edit")) return !1;
        if (b.editState = a, b.writeCookie("editState", a, 360), a)
            for (d = 0; d < c.length; d++) c.eq(d).attr("page_id") == b.result.page[b.seating].id && c.eq(d).removeClass("hide");
        else c.removeClass("hide"), c.addClass("hide")
    },
    // 添加页 
    addPage = function (a, b) {
        var e, f, c = this,
            d = !1;
        if (this.result.page.forEach(function (a, b) {
                a.layout.layTemplate && (d = !0, c.result.page.splice(b, 1))
            }), c.result.page.push(a), !this.guestState && b ? (d ? c.result.page.push(c.guests.html) : null, c.guestState = !0, c.seating = c.result.page.length - 1) : this.guestState ? (c.result.page.push(c.guests.html), c.seating = c.result.page.length - 2) : c.seating = c.result.page.length - 1, c.get_infinite(), this.seatState && (c.seatState = !1), $("#all-page").empty().append(c.createPage(c.result.page)), c.lastAbout(), c.editState)
            for (e = $(".editIcon"), e.addClass("hide"), f = 0; f < e.length; f++) e.eq(f).attr("page_id") == c.result.page[c.seating].id && e.eq(f).removeClass("hide")
    }, editCard_app = function (a, b) {
        "a" == a ? navigator.userAgent.indexOf("Android") > -1 ? window.messageHandlers.onEditBasicInfo(JSON.stringify(b)) : navigator.userAgent.indexOf("iPhone") > -1 && window.webkit.messageHandlers.onEditBasicInfo.postMessage(b) : navigator.userAgent.indexOf("Android") > -1 ? window.messageHandlers.onEditPageHole(JSON.stringify(b)) : navigator.userAgent.indexOf("iPhone") > -1 && window.webkit.messageHandlers.onEditPageHole.postMessage(b)
    },
    // 编辑页
    editPageHoles = function (a) {
        var d, b = $(".pageImg"),
            c = b.length;
        for (d = 0; c > d; d++) a.forEach(function (a) {
            var e = b.eq(d);
            e.attr("page_id") == a.page_id && e.attr("id") == a.id && e.attr("type") == a.type && e.attr("src", a.img)
        });
        this.result.page.forEach(function (b) {
            a.forEach(function (a) {
                b.id == a.page_id && b.layout.elements.forEach(function (b) {
                    b.id && b.id == a.id && b.type == a.type && (b.img = a.img)
                })
            })
        })
    }, 
    // 删除页
    delPage = function (a) {
        function d() {
            var a, d, e;
            for (a = 0; a < $(".ebg").length; a++) $(".ebg").eq(a).removeClass("ele_background_" + a);
            for (d = $(".editIcon"), e = 0; e < d.length; e++) d.eq(e).attr("page_id") == b && d.eq(e).remove();
            setTimeout(function () {
                for (var a = 0; a < $(".layout").length; a++) $(".layout").eq(a).attr("page_id") == b && ($(".layout").eq(a).remove(), $(".ebg").eq(a).remove())
            }, 100), setTimeout(function () {
                for (var a = 0; a < $(".ebg").length; a++) $(".ebg").eq(a).addClass("ele_background_" + a);
                c.lastAbout()
            }, 200)
        }

        if (0 >= a) return !1;
        var b = this.result.page[a].id,
            c = this;
        this.result.page.splice(a, 1), c.seating == a ? c.gotoPage(a - 1) : c.seating > a && c.seating--, setTimeout(function () {
            d()
        }, 600)
    }, 
    // 获取当前页
    getCurrentPage = function () {
        return this.seating
    }, 
    // 去哪一页
    gotoPage = function (a) {
        var d, e, f, b = this,
            c = b.seating;
        if (a == c) return !1;
        for (d = 0, 0 == a ? $("#upImg").show() : $("#upImg").hide(); a >= d;) $(".ele_background_" + d).css({
            "-webkit-transform": "translateY(0)"
        }), d++;
        if ($("#video").parent().removeClass("vhave"), $("#video").on("touchstart", function () {
                navigator.userAgent.indexOf("Android") > -1 && (document.getElementById("vid").muted = "muted", document.getElementById("vid").play())
            }), c > a ? ($(".layout").eq(a).removeClass("hide").css({
                "-webkit-transform": "scale(1) translateY(0)"
            }), $(".layout").eq(c).addClass("hide").css({
                "-webkit-transform": "translateY(0)"
            })) : ($(".layout").eq(a).removeClass("hide").css({
                "-webkit-transform": "translateY(0)"
            }), $(".layout").eq(c).addClass("hide")), b.seating = a, b.seatState = !1, $("#other .editIcon").remove(), $("#all-page").empty().append(b.createPage(b.result.page)), b.lastAbout(), a >= b.result.page.length - 1 && (b.otherMap(b.srcMap), $(".mapSeat").attr("src", b.mapSrc), $("#upImg").hide(), setTimeout(function () {
                $("#updownIcon").hide()
            }, 300)), !b.editState) return !1;
        for (e = $(".editIcon"), e.addClass("hide"), f = 0; f < e.length; f++) e.eq(f).attr("page_id") == b.result.page[b.seating].id && e.eq(f).removeClass("hide");
        b.hideEditState && e.addClass("nosee")
    }, 
    // 自动播放页面
    autoPlayPage = function () {
        if (1 == this.editState) return !1;
        var b, a = this,
            c = a.seating;
        return a.autoState ? (a.seating <= a.result.page.length - 1 && $("#upImg").show(), clearTimeout(b), !1) : ($("#upImg").hide(), $("#video").parent().removeClass("vhave"), c < a.result.page.length - 1 ? (c++, a.gotoPage(c), b = setTimeout(function () {
            a.autoPlayPage(), clearTimeout(b)
        }, 7e3)) : (c = 0, $(".ebg").css({
            "-webkit-transform": "translateY(" + a.height + "px)"
        }), a.gotoPage(c), b = setTimeout(function () {
            a.autoPlayPage(), clearTimeout(b)
        }, 7e3)), void 0)
    }, 
    // 定位图标
    positionIcon = function (a, b, c, d, e) {
        var f, g, h, i, j, k, l, m, n;
        if (this.log = [], f = this, g = f.width, h = b, c.text_type) {
            if (f.log.push({
                    text_type: c.text_type,
                    x: c.x,
                    y: c.y,
                    w: c.width,
                    h: c.height,
                    id: c.id,
                    page_id: a.page_id
                }), d == e - 1) {
                for (i = {}, i.x = this.log[0].x, i.y = this.log[0].y, j = 0; j < this.log.length; j++) Number(i.x) > Number(this.log[j].x) ? i.x = this.log[j].x : null, Number(i.y) < Number(this.log[j].y) ? i.y = this.log[j].y : null, i.x == this.log[j].x && (i.w = this.log[j].w, Number(i.w) < Number(this.log[j].w) ? i.w = this.log[j].w : null), i.y == this.log[j].y && (i.h = this.log[j].h, Number(i.h) < Number(this.log[j].h) ? i.h = this.log[j].h : null);
                return h = a.isdown ? "bottom:" + Number((f.UI_HEIGHT - i.y - i.h / 2) / f.UI_WIDTH * g + 20) + "px" : c.height >= f.UI_HEIGHT ? "top:" + (f.height - 20) / 2 + "px" : "top:" + Number(Number(i.y) / 2 + i.h / f.UI_WIDTH * g / 2 - 20) + "px", k = {
                    top: h,
                    left: Number(i.x / f.UI_WIDTH) * g + Number(i.w / f.UI_WIDTH) * g / 2 - 20 + "px"
                }, l = '<div class="editIcon edit_text card_info hide" page_id="' + a.page_id + '" id="' + a.id + '" type="' + a.type + '" style="' + k.top + ";left:" + k.left + '"><i></i><em></em><img src="//qnm.hunliji.com/o_1blae19da7r21etql8r1h45nv2m.png" /></div>', $("#other").append(l), !1
            }
            return !1
        }
        if (a.type) {
            if (k = {
                    top: h,
                    left: Number(c.x / f.UI_WIDTH) * g + Number(c.width / f.UI_WIDTH) * g / 2 - 20 + "px"
                }, a.isdown ? c.video_path ? (k.top = "bottom:" + Number(f.height / 2 - 30) + "px", k.left = (f.width - 20) / 2 + "px") : k.top = "bottom:" + Number((f.UI_HEIGHT - c.y - c.height / 2) / f.UI_WIDTH * g - 20) + "px" : c.video_width ? k.top = "top:120px" : (m = Number(a.top.replace("px", "")), n = Number(a.height.replace("px", "")), k.top = "top:" + (m + (n - 40) / 2) + "px"), a.edit_btn_position) switch (a.edit_btn_position.toString()) {
                case "1":
                    m = Number(a.top.replace("px", "")), n = Number(a.height.replace("px", "")) / 10, k.top = "top:" + (m + n) + "px";
                    break;
                case "2":
                    m = Number(a.top.replace("px", "")), n = Number(a.height.replace("px", "")), k.top = "top:" + (m + n - 40 - n / 10) + "px"
            }
            l = '<div  class="editIcon edit_img hide ' + ("map" == a.type ? "card_info" : "") + " " + (c.video_width ? "videoIcon" : "") + '" videoW="' + c.video_width + '" videoH="' + c.video_height + '" videoP="' + c.video_path + '" page_id="' + a.page_id + '" id="' + a.id + '" type="' + a.type + '" style="' + k.top + ";left:" + k.left + '"><i></i><em></em><img src="' + ("map" == a.type || "text" == a.type ? "//qnm.hunliji.com/o_1blae19da7r21etql8r1h45nv2m.png" : "//qnm.hunliji.com/o_1blae09s8fcu12qrpgv1qgh1tijh.png") + '" /></div>', $("#other").append(l)
        }
    }, selectGift_v2 = function () {
        function l() {
            a.innerHTML = '<div id ="giftMoreV2" class="gift_box_v2" style="width:' + 626 / c.UI_WIDTH * c.width + "px;padding: " + 20 / c.UI_WIDTH * c.width + 'px 0px"><ul id ="g_bd_wrap_v2" style="width:' + 626 / c.UI_WIDTH * c.width * Math.ceil(e.length / 8) + 'px;overflow:hidden">' + b + '</ul><div class="pageGiftV2"></div></div>          </div></div>', document.getElementById("gift_lists") && document.getElementById("gift_lists").appendChild(a), $(".g_bd_v2").css({
                width: 626 / c.UI_WIDTH * c.width
            }), $(".g_layout_v2").css({
                padding: 4 / c.UI_WIDTH * c.width
            }), $(".g_layout_v2").eq(c.giftSeat).find("span").addClass("ap"), c.giftProperty = {
                id: $(".g_layout_v2").eq(c.giftSeat).find("span").attr("cid"),
                title: $(".g_layout_v2").eq(c.giftSeat).find("span").attr("title"),
                price: $(".g_layout_v2").eq(c.giftSeat).find("span").attr("price")
            }
        }

        function m() {
            var a, b, c;
            for (a = 0; a < $(".g_bd_v2").length; a++) a > 1 && $(".g_bd_v2").eq(a).hide();
            for (b = 0, c = ""; b < Math.ceil($(".g_bd_v2").length);) c += "<i></i>", b++;
            $(".pageGiftV2").append(c), $(".pageGiftV2").find("i").eq(0).addClass("ko"), $(".pageGiftV2 i").length <= 1 && $(".pageGiftV2").hide()
        }

        var e, f, g, h, i, j, k, a = document.createElement("div"),
            b = "",
            c = this;
        for (a.setAttribute("id", "send_gift_v2"), e = c.allGifts, f = "", g = "", h = 0, i = 0, j = [1, 2, 3, 4, 5, 6, 7, 9, 10, 11, 12, 13, 14, 15, 17, 18], k = 0; k < e.length; k++) 8 > h && e[k].icon2 && (f += '<div class="g_layout_v2 " style="width: 25%;box-sizing: border-box">                                <span price="' + e[k].price + '" title="' + e[k].title + '" cid="' + e[k].id + '"><img src="' + e[k].icon2 + '?imageView2/1/w/200/h/200"/></span>                            </div>', h++, i++, h > 7 ? (h = 0, g = '<li class="g_bd_v2">' + f + "</li>", f = "", b += g) : j.indexOf(i) > -1 && e.length == i && (g = '<li class="g_bd_v2">' + f + "</li>", f = "", b += g));
        setTimeout(function () {
            l(), m(), c.gift_action_v2()
        }, 300)
    }, gift_action_v2 = function () {
        var a = new Hammer(document.getElementById("giftMoreV2")),
            b = this;
        a.on("swipe", function (a) {
            function c(a) {
                $("#g_bd_wrap_v2").css({
                    "-webkit-transform": "translate3d(" + -(626 / b.UI_WIDTH * b.width) * a + "px, 0px, 0px)",
                    "-webkit-transition": "-webkit-transform 350ms cubic-bezier(0.42, 0, 0.58, 1.0)"
                })
            }

            a.deltaX > 0 && b.gift_touchSeat > 0 ? b.gift_touchSeat-- : a.deltaX < 0 && b.gift_touchSeat < Math.ceil($(".g_bd_v2").length) - 1 && b.gift_touchSeat++, $(".pageGiftV2 i").removeClass("ko"), $(".pageGiftV2 i").eq(b.gift_touchSeat).addClass("ko"), c(b.gift_touchSeat)
        })
    }, giftsMarquee = function () {
        var c, d, e, f, a = this,
            b = "";
        for (b = "", c = 0, d = a.gifts.length; d > c; c++) b += a.gifts[c].card_gift ? '<p><strong style="margin-right:4px">' + a.gifts[c].giver_name + '</strong>送了<i style="margin-right:13px">' + a.gifts[c].card_gift.title + "</i>" + a.gifts[c].card_gift.desc + "</p>" : '<p><strong style="margin-right:10px">' + a.gifts[c].giver_name + "</strong>送了<b>" + a.gifts[c].price + "</b>元红包</p>";
        $("#scrollBox2 li").eq(0).html(b), $("#scrollBox2 li p").length > 4 && ($("#scrollBox2 li").eq(1).html(b), e = null, f = 1, $("#scrollBox2 li").css({
            height: $("#scrollBox2 li").height() + "px"
        }), $("#scrollBox2").css({
            "-webkit-transform": "translateY(0px)"
        }), e = setInterval(function () {
            var a = $("#scrollBox2").css("-webkit-transform").replace(/[^0-9\-,]/g, "").split(",")[0] - f;
            $("#scrollBox2").css({
                "-webkit-transform": "translateY(" + a + "px)"
            }), $("#scrollBox2").css("-webkit-transform").replace(/[^0-9\-,]/g, "").split(",")[0] <= -$("#scrollBox2 li").height() && $("#scrollBox2").css({
                "-webkit-transform": "translateY(0px)"
            })
        }, 50))
    }, giftPage = function () {
        var d, e, g, i, j, a = this,
            b = 0;
        return $("#giftPage").length > 0 || this.type ? !1 : (a.createRedPackets(), d = "", d = '<div id="giftPage" >                  <div class="gift_warp">                    <div class="gift_content"><ul id="scrollBox2"><li></li><li></li></ul><span></span></div>                    <div class="gift_list">                    <div id="gift_lists"></div>                    <a class="send_gift_btn">送礼物</a>                    </div>                  </div>                  <div class="red_packets">                    <a><img src="http://qnm.hunliji.com/o_1br6ro5okqdi16qb1tv465a1oc015.png"/></a>                    <i class="gift_tishi_v2"><img src="//qnm.hunliji.com/o_1br0jjltn1b4f1nntnu41b2n1ih9c.png" style="width:' + 532 / a.UI_WIDTH * a.width + 'px"/></i>                  </div>                  <div id="updownIconV2"><img src="http://qnm.hunliji.com/o_1br11t4b71j27alrfgbca1itkm.png" style="width:28px;height:12px"></div>                </div>', e = 24 / a.UI_WIDTH * a.width, 16 / a.UI_WIDTH * a.width, g = 120 / a.UI_WIDTH * a.width, 72 / a.UI_WIDTH * a.width, i = '<div id="gift_bg" style="transform:translateY(' + a.height + 'px);"></div><div id="gift_form" style="padding:0 ' + e + "px 0 " + e + 'px; ">                                <div class="gift_name"><p><b>赠送的礼物：</b><i class="gift_name_txt"></i></p></div>                                <div class="send_user">                                  <div class="send_user_bd"><i><b>赠送人：</b></i><input class="send_user_txt" id="nameTxtV2" style="padding:' + e + "px 0 " + e + 'px 0;" type="text" value="" placeholder="请输入您的姓名"/></div>                                  <div class="send_user_btn"><span class="sendGiftBtn" id="sendGiftBtnV2" style="width:' + g + "px;padding:" + e + "px 0 " + e + 'px 0;">去支付</span></div>                                </div></div>', $("#other").append(d), setTimeout(function () {
            a.giftsMarquee()
        }, 3e3), $("#gift_form").length <= 0 ? $("body").append(i) : null, $("#giftPage").css({
            top: this.height + "px",
            width: this.width + "px",
            height: this.height + "px",
            background: "url('http://qnm.hunliji.com/o_1br0kno0d70o5f12gk1nei53lh.png') repeat-y 0 0",
            "background-size": "100%"
        }), $(".gift_warp").css({
            width: 700 / this.UI_WIDTH * this.width + "px",
            background: "#fff",
            "border-radius": "20px",
            margin: "auto",
            "margin-top": 40 / this.UI_WIDTH * this.width + "px",
            padding: 40 / this.UI_WIDTH * this.width + "px 0"
        }), $(".red_packets").css({
            width: 734 / this.UI_WIDTH * this.width + "px",
            margin: "auto",
            "padding-top": 16 / this.UI_WIDTH * this.width + "px"
        }), $(".red_packets a").css({
            display: "block"
        }), $(".red_packets i").css({
            display: "block",
            width: 700 / this.UI_WIDTH * this.width + "px",
            height: "25px",
            margin: "auto",
            "text-align": "center"
        }), $(".send_gift_btn").css({
            display: "block",
            width: 600 / this.UI_WIDTH * this.width + "px",
            height: 80 / this.UI_HEIGHT * this.height + "px",
            border: "1px solid #f25863",
            color: "#f25863",
            "text-align": "center",
            "line-height": 80 / this.UI_HEIGHT * this.height + "px",
            "font-size": "14px",
            "border-radius": "10px",
            margin: "auto"
        }), $(".gift_content").css({
            position: "relative",
            color: "#000",
            margin: "0 16px",
            "border-bottom": "1px solid #e2e2e2",
            height: 224 / this.UI_HEIGHT * this.height + "px",
            overflow: "hidden"
        }), $(".gift_content ul").css({
            margin: "0 " + 20 / this.UI_WIDTH * this.width + "px " + 20 / this.UI_WIDTH * this.width + "px",
            "line-height": 52 / this.UI_HEIGHT * this.height + "px"
        }), $(".gift_content span").css({
            height: 28 / this.UI_WIDTH * this.width + "px"
        }), $(".send_user_bd").css({
            width: 480 / this.UI_WIDTH * this.width + "px"
        }), $(".send_user_txt").css({
            width: 340 / this.UI_WIDTH * this.width + "px"
        }), $(document).on("touchend", "#gift_bg", function () {
            setTimeout(function () {
                $(".nameTxtV2").val("").blur(), $(".nameTxtV2").blur()
            }, 300)
        }), $(document).on("touchstart", "#gift_bg", function () {
            $(this).css({
                "-webkit-transform": "translateY(" + a.height + "px)"
            }), $("#gift_form").css({
                zIndex: "-1",
                opacity: 0,
                "-webkit-transform": "translateY(-180px)"
            }), $("#nameTxtV2").blur()
        }), $(document).on("touchstart", ".send_gift_btn", function (a) {
            b = a.changedTouches[0].clientY
        }), $(document).on("touchend", ".send_gift_btn", function (c) {
            if (c.changedTouches[0].clientY - b < 10 && c.changedTouches[0].clientY - b >= 0) {
                var d = a.giftProperty.title + "（￥" + a.giftProperty.price + "）";
                $(".gift_name_txt").text(d), "" != a.send_name && $("#nameTxtV2").val(a.send_name), setTimeout(function () {
                    $("#gift_form").css({
                        zIndex: 12,
                        opacity: 1
                    }), $("#gift_bg").css({
                        "-webkit-transform": "translateY(0)"
                    }), $("#gift_form").css({
                        "-webkit-transform": "translateY(0)"
                    })
                }, 300), navigator.userAgent.indexOf("Android") > -1 ? setTimeout(function () {
                    $("#nameTxtV2").focus()
                }, 300) : $("#nameTxtV2").focus()
            }
        }), j = new Hammer(document.getElementById("giftPage")), a = this, j.get("swipe").set({
            direction: Hammer.DIRECTION_ALL
        }), j.on("swipe", function (b) {
            var c = b.deltaY;
            if (c > 100 && "0px" == $("#giftPage").css("top") && a.seating == a.result.page.length - 1 && !a.showGiftPage) return a.showGiftPage = !0, $("#giftPage").css({
                top: a.height + "px",
                opacity: 0
            }), !1;
            if (-100 > c) a.seating <= a.result.page.length - 2 ? a.lastState ? null : a.lastAbout() : !$(".layout").eq(a.result.page.length - 1).hasClass("hide") && a.seating == a.result.page.length - 1 && $("#lastAbout").css("top") == a.height + "px" && a.lastDown && 0 == a.showGiftPage && (a.lastDown = !1, $("#lastAbout").css({
                top: 0,
                opacity: 1
            }), a.make || (a.sdkData({
                action: "make",
                eventable_type: "Card",
                additional: {
                    ip: a.ip,
                    card_id: a.card_id,
                    num: a.rans(32)
                }
            }, function () {
                console.log("sdk_make")
            }), a.make = 1)), $("#upImg").hide();
            else {
                if ("0px" == $("#lastAbout").css("top") && a.seating == a.result.page.length - 1 && !a.lastDown) return a.lastDown = !0, $("#lastAbout").css({
                    top: a.height + "px",
                    opacity: 0
                }), !1;
                a.seating <= 1 && $("#upImg").show()
            }
        }), void 0)
    }, createRedPackets = function () {
        var f, a = this,
            b = 24 / a.UI_WIDTH * a.width;
        return 16 / a.UI_WIDTH * a.width, 120 / a.UI_WIDTH * a.width, 72 / a.UI_WIDTH * a.width, f = '<div id="red_packets_bg" class="hide"></div>        <div id="red_packets_form" class="hide">        <div class="container"><div class="flip"><div class="front"><img src="http://qnm.hunliji.com/o_1br3sqcqfihrqq73fn1rcs2iru.png" style="width:100%;height:100%"/></div><div class="back"><img src="http://qnm.hunliji.com/o_1br6i7odt1hf345lpm1dqdog610.png" style="width:100%;height:100%"/></div></div></div>        <div class="money"></div>        <div class="red_packets_before"></div>        <div class="red_packets_wrap">        <div class="red_packets_name"><i>赠送人：</i><input class="red_packets_name_txt"  style="padding:' + b + "px 0 " + b + 'px 0;" type="text" value="" placeholder="请输入您的姓名"/></div>        <div class="red_packets_money"><i>礼金金额：</i><input class="red_packets_money_txt"  style="padding:' + b + "px 0 " + b + 'px 0;" type="number" value="" placeholder="请输入礼金金额"/></div>        <i class="red_packets_tip"></i>        <a class="red_packets_btn" id="sendPriceBtnV2"><img src="http://qnm.hunliji.com/o_1br6i543210sh1ftisg57fe135tr.png"/></a>        </div>        <a class="close_red_packets"><img src="http://qnm.hunliji.com/o_1br37s33k1155ams19a6h471nrb7.png"/></a>        </div>', $("#red_packets_bg").length <= 0 ? ($("#other").append(f), $(".container").css({
            width: 636 / this.UI_WIDTH * this.width + "px",
            height: 183 / this.UI_HEIGHT * this.height + "px"
        }), $(".front").css({
            width: 636 / this.UI_WIDTH * this.width + "px",
            height: 183 / this.UI_HEIGHT * this.height + "px"
        }), $(".back").css({
            width: 636 / this.UI_WIDTH * this.width + "px",
            height: 183 / this.UI_HEIGHT * this.height + "px"
        }), $(".close_red_packets").css({
            width: 104 / a.UI_WIDTH * a.width + "px",
            height: 104 / a.UI_WIDTH * a.width + "px",
            "text-align": "center"
        }), $(".close_red_packets img").css({
            width: 52 / a.UI_WIDTH * a.width + "px",
            height: 52 / a.UI_WIDTH * a.width + "px",
            "margin-top": "25%"
        }), $(".red_packets_wrap").css({
            position: "relative",
            "z-index": "13px",
            top: 80 / a.UI_WIDTH * a.width + "px"
        }), $("#red_packets_form").css({
            width: 636 / this.UI_WIDTH * this.width + "px",
            height: 860 / this.UI_HEIGHT * this.height + "px",
            margin: "0 auto",
            top: 294 / this.UI_WIDTH * this.width + "px"
        }), $(".red_packets_btn").css({
            display: "block",
            width: 520 / a.UI_WIDTH * a.width + "px",
            height: 88 / a.UI_HEIGHT * a.height + "px",
            margin: "auto"
        }), $(".red_packets_name").css({
            width: 520 / a.UI_WIDTH * a.width + "px"
        }), $(".red_packets_money").css({
            width: 520 / a.UI_WIDTH * a.width + "px"
        }), $(".red_packets_wrap input").css({
            width: 330 / a.UI_WIDTH * a.width + "px"
        }), $(".red_packets_tip").css({
            display: "block",
            width: 460 / this.UI_WIDTH * this.width + "px",
            height: "25px",
            margin: "auto",
            "margin-bottom": 30 / this.UI_WIDTH * this.width + "px",
            background: "url('http://qnm.hunliji.com/o_1br1ih4sf1gj9vah1gphldi8ic15.png') no-repeat 0 0",
            "background-size": "100%"
        }), $(".money").css({
            width: 565 / a.UI_WIDTH * a.width + "px",
            height: 700 / a.UI_HEIGHT * a.height + "px"
        }), void 0) : !1
    }, lastAbout = function () {
        var c, d, e, f, g, h, i, a = this,
            b = a.result.cardInfo.card_saas_info;
        return $("#lastAbout").length > 0 || this.type ? !1 : (this.lastState = !0, this.lastDown = !0, c = {}, d = "", c.logo = "//qnm.hunliji.com/o_1bid6p3ojgs8uptnu919pd5os7.png", c.logo_w = 180, c.twoImg = "//qnm.hunliji.com/o_1bvtl0dcqn7c1cju1uv51a4k7277.png", c.towImg_w = 340, b ? (this.getSaasMerchantInfo(b.saas_merchant_id), d = '<div id="lastAbout">                      <div class="qrcode"><img src="' + b.saas_qrcode + '"/></div>                      <h3 class="name"></h3>                      <p class="address"></p>                      <div class="btn_group">                        <a class="contactUs" href="javascript:;">联系我们</a>                        <a class="appoint" href="javascript:;">预约到店</a>                        <span class="support">技术支持：婚礼纪</span>                      </div>                    </div>', e = 30 / a.UI_WIDTH * a.width, f = 180 / a.UI_WIDTH * a.width, g = 72 / a.UI_WIDTH * a.width, h = '<div id="contact_bg" style="transform:translateY(' + a.height + 'px);"></div><div id="contact" style="padding:0 ' + e + "px 0 " + e + 'px; ">                                    <div class="appoint_title">留下您的联系方式以方便预约</div>                                    <div class="appoint_phone"><i>联系电话</i><input class="appoint_phone_txt" style="padding:' + e + "px 0 " + e + 'px 0;" type="text" value="" placeholder="请输入联系电话"/></div>                                    <div class="appoint_name">                                      <div class="appoint_name_bd"><i>您的姓名</i><input class="appoint_name_txt" style="padding:' + e + "px 0 " + e + 'px 0;" type="text" value="" placeholder="请输入您的姓名"/></div>                                      <div class="appoint_name_btn"><span class="appointBtn" style="width:' + f + "px;height:" + g + "px;line-height:" + g + 'px">立即预约</span></div>                                    </div></div>', $("#contact").length <= 0 ? $("body").append(h) : null) : d = 1 == this.card_claim ? '<div id="lastAbout">              <div class="logo"><img src="' + c.logo + '"/></div>              <h5>长按二维码制作电子请帖</h5>              <div class="two2d"><img src="' + c.twoImg + '"/></div>              <div class="moreIcon"><a id="claim"><em>领取礼包</em></a><a href="' + (a.iosReg() ? "/p/wedding/Public/wap/invitationCard/feedBack/#/index/" + this.card_id + "?claim=1" : "/p/wedding/Public/wap/invitationCard/feedBack_new/#/index/" + this.card_id + "?claim=1") + '"><i>礼金提现与投诉建议</i></a></div></div>' : '<div id="lastAbout">            <div class="logo"><img src="' + c.logo + '"/></div>            <h5>长按二维码制作电子请帖</h5>            <div class="two2d"><img src="' + c.twoImg + '"/></div>            <div class="moreIcon"><a id="claim"><em>领取礼包</em></a><a style="color:#fff;opacity:0.7" href="/p/wedding/Public/wap/invitationCard/feedBack_new/#/index/' + this.card_id + '"><i>礼金提现与投诉建议</i></a></div>          </div>', $(document).on("touchstart", ".appoint", function () {
            setTimeout(function () {
                $("#contact").css({
                    zIndex: 9,
                    opacity: 1
                }), $("#contact_bg").css({
                    "-webkit-transform": "translateY(0)"
                })
            }, 300), navigator.userAgent.indexOf("Android") > -1 ? setTimeout(function () {
                $(".appoint_phone_txt").focus()
            }, 300) : $(".appoint_phone_txt").focus()
        }), $(document).on("touchstart", ".appointBtn", function () {
            var e, c = $(".appoint_phone_txt").val(),
                d = $(".appoint_name_txt").val();
            return /^1\d{10}$/.test(c) ? d ? (e = {
                phone: c,
                name: d,
                merchant_id: b.saas_merchant_id,
                f_wxcard_id: a.card_id
            }, $.ajax({
                url: a.saashost + a.API.appointment,
                type: "post",
                data: e,
                success: function (b) {
                    0 == b.status.RetCode ? ($(".appoint_phone_txt").blur(), $(".appoint_name_txt").blur(), a.outputMsg("预约成功"), $("#contact").css({
                        zIndex: "-1",
                        opacity: 0
                    })) : 84 == b.status.RetCode && a.outputMsg("您已经预约成功，不能重复预约！")
                }
            }), void 0) : (a.outputMsg("请输入您的姓名"), !1) : (a.outputMsg("请输入11位手机号"), !1)
        }), $(document).on("touchend", "#contact_bg", function (a) {
            a.stopPropagation(), setTimeout(function () {
                $(".appoint_name_txt").val("").blur(), $(".appoint_name_txt").blur()
            }, 300)
        }), $(document).on("touchstart", "#contact_bg", function (b) {
            b.stopPropagation(), $(this).css({
                "-webkit-transform": "translateY(" + a.height + "px)"
            }), $("#contact").css({
                zIndex: "-1",
                opacity: 0
            }), $(".appoint_phone_txt").blur(), $(".appoint_name_txt").blur()
        }), $(document).on("touchstart", "#lastAbout", function (a) {
            a.stopPropagation(), $("#contact").css({
                zIndex: "-1",
                opacity: 0
            }), $(".appoint_phone_txt").blur(), $(".appoint_name_txt").blur()
        }), $(document).on("touchstart", "#claim", function () {
            a.sdkData({
                action: "insurance",
                eventable_type: "Card",
                additional: {
                    ip: a.ip,
                    card_id: a.card_id,
                    num: a.rans(32)
                }
            }), location.href = "http://m.cudaojia.com?appKey=bf303df5c6a74d8e95f49e4d7656ea84&appType=app&appEntrance=1&business=money&i=__IMEI__&f=__IDFA__"
        }), $("#other").append(d), $("#lastAbout").css({
            top: this.height + "px",
            "padding-top": 138 / this.UI_WIDTH * this.width + "px",
            width: this.width + "px",
            height: this.height + "px"
        }), $(".logo").css({
            width: c.logo_w / this.UI_WIDTH * this.width + "px"
        }), $(".two2d").css({
            width: c.towImg_w / this.UI_WIDTH * this.width + "px"
        }), $(".moreIcon").css({
            marginTop: 60 / this.UI_WIDTH * this.width + "px",
            width: c.towImg_w / this.UI_WIDTH * this.width + "px"
        }), $(".moreIcon a").eq(1).css({
            marginTop: (this.width <= 320 ? 100 : 140) / this.UI_WIDTH * this.width + "px"
        }), $(".support").css({
            "margin-top": (this.width <= 320 ? 160 : 200) / this.UI_HEIGHT * this.height + "px",
            display: "block",
            "text-align": "center",
            color: "#999"
        }), navigator.userAgent.indexOf("Android") > -1 && ($(".moreIcon a").eq(1).css({
            marginTop: (this.width <= 320 ? 30 : 110) / this.UI_WIDTH * this.width + "px"
        }), $(".support").css({
            "margin-top": (this.width <= 320 ? 160 : 200) / this.UI_HEIGHT * this.height + "px",
            display: "block",
            "text-align": "center",
            color: "#999"
        }), navigator.userAgent.indexOf("HUAWEI") > -1 && ($("#lastAbout").css({
            top: this.height + "px",
            "padding-top": 98 / this.UI_WIDTH * this.width + "px",
            width: this.width + "px",
            height: this.height + "px"
        }), $(".moreIcon a").eq(1).css({
            marginTop: (this.width <= 320 ? 30 : 62) / this.UI_WIDTH * this.width + "px"
        }), $(".support").css({
            "margin-top": (this.width <= 320 ? 160 : 200) / this.UI_HEIGHT * this.height + "px",
            display: "block",
            "text-align": "center",
            color: "#999"
        }))), $("#lastAbout h5").css({
            "margin-top": 60 / this.UI_WIDTH * this.width + "px",
            "margin-bottom": 20 / this.UI_WIDTH * this.width + "px",
            "font-size": 28 / this.UI_WIDTH * this.width + "px"
        }), $("#lastAbout h3").css({
            "margin-top": 32 / this.UI_WIDTH * this.width + "px",
            "font-size": 32 / this.UI_WIDTH * this.width + "px"
        }), $("#lastAbout p").css({
            "margin-top": 162 / this.UI_WIDTH * this.width + "px",
            "font-size": 28 / this.UI_WIDTH * this.width + "px"
        }), $(".qrcode").css({
            width: c.towImg_w / this.UI_WIDTH * this.width + "px",
            margin: "auto",
            "margin-top": 60 / this.UI_HEIGHT * this.height + "px",
            border: "1px solid #e7e7e7"
        }), $(".address").css({
            color: "#666",
            margin: "auto",
            width: 430 / this.UI_WIDTH * this.width + "px",
            "font-size": 28 / this.UI_WIDTH * this.width + "px",
            "text-align": "center",
            "margin-bottom": 55 / this.UI_HEIGHT * this.height + "px"
        }), $(".btn_group a").css({
            margin: "auto",
            width: 430 / this.UI_WIDTH * this.width + "px",
            height: 72 / this.UI_HEIGHT * this.height + "px",
            "line-height": 72 / this.UI_HEIGHT * this.height + "px",
            color: "#fff",
            "font-size": 28 / this.UI_WIDTH * this.width + "px",
            display: "block",
            "text-align": "center",
            "margin-top": 20 / this.UI_HEIGHT * this.height + "px"
        }), $(".name").css({
            color: "#000",
            "margin-top": 70 / this.UI_HEIGHT * this.height + "px",
            "margin-bottom": 20 / this.UI_HEIGHT * this.height + "px",
            "font-weight": "700"
        }), $(".btn_group .contactUs").css({
            background: "#f83244"
        }), $(".btn_group .appoint").css({
            background: "#333"
        }), i = new Hammer(document.getElementById("lastAbout")), a = this, i.get("swipe").set({
            direction: Hammer.DIRECTION_ALL
        }), i.on("swipe", function (b) {
            var c = b.deltaY;
            return c > 0 && "0px" == $("#lastAbout").css("top") && a.seating == a.result.page.length - 1 && !a.lastDown ? (a.lastDown = !0, $("#lastAbout").css({
                top: a.height + "px",
                opacity: 0
            }), !1) : void 0
        }), void 0)
    }, getSaasMerchantInfo = function (a) {
        var b = this;
        $.ajax({
            url: b.saashost + b.API.getInfo,
            type: "get",
            data: {
                merchant_id: a
            },
            success: function (a) {
                0 == a.status.RetCode && ($("#lastAbout .name").html(a.data.name), $("#lastAbout .address").html(a.data.address), $("#lastAbout").css({
                    background: "rgba(253, 254, 254,.9)"
                }), a.data.contact_phone ? $(".contactUs").attr("href", "tel:" + a.data.contact_phone) : $(".contactUs").attr("href", "tel:" + a.data.phone))
            }
        })
    }, upDownIcon = function () {
        var a = this,
            b = document.createElement("div");
        b.setAttribute("id", "upImg"), b.style.bottom = 80 / this.UI_WIDTH * this.width + "px", b.innerHTML = '<img src="' + a.pageIcon + '"/>', document.body.appendChild(b)
    }, iosReg = function () {
        var b = navigator.userAgent.toLowerCase(),
            c = b.match(/cpu iphone os (.*?) like mac os/);
        return c && c[1].split(/_/g)[0] < 9 ? c[1].split(/_/g)[0] : void 0
    }, isIphoneX = function () {
        return navigator.userAgent.indexOf("iPhone") > -1 && 812 == screen.height && 375 == screen.width
    }, touchAction = function () {
        //    alert(3);
        console.log(document.getElementById("wrap"));
        console.log('事件');
        $('#wrap').click(function () {
            //        alert(1);
        });
        var a = new Hammer(document.getElementById("wrap")),
            b = this,
            c = b.type ? 300 : 600;
        console.log('数据');
        console.log(a);
        console.log(b.type);
        b.type && $(".layout").css({
                "-webkit-transition-duration": "300ms"
            }),
            console.log(Hammer.DIRECTION_ALL);

        a.get("swipe").set({
                direction: Hammer.DIRECTION_ALL
            }),
            console.log(a);
        a.on("swipe", function (a) {
            //    alert(4);
            var e, f, g, d = a.deltaY;
            if (b.seating >= b.result.page.length - 2 && b.otherMap(b.srcMap), b.autoState = !0, 0 > d) b.seating <= b.result.page.length - 2 ? b.lastState ? null : b.lastAbout() : b.otherState.chat_gift && b.otherState.chat_cash ? $(".layout").eq(b.result.page.length - 1).hasClass("hide") || b.seating != b.result.page.length - 1 || $("#giftPage").css("top") != b.height + "px" || (b.showGiftPage = !1, $("#giftPage").css({
                top: 0,
                opacity: 1
            }), $("#upImg").hide()) : !$(".layout").eq(b.result.page.length - 1).hasClass("hide") && b.seating == b.result.page.length - 1 && $("#lastAbout").css("top") == b.height + "px" && b.lastDown && (b.lastDown = !1, $("#lastAbout").css({
                top: 0,
                opacity: 1
            }), b.make || (b.sdkData({
                action: "make",
                eventable_type: "Card",
                additional: {
                    ip: b.ip,
                    card_id: b.card_id,
                    num: b.rans(32)
                }
            }, function () {
                console.log("sdk_make")
            }), b.make = 1)), $("#upImg").hide();
            else {
                if ("0px" == $("#lastAbout").css("top") && b.seating == b.result.page.length - 1 && !b.lastDown) return b.lastDown = !0, $("#lastAbout").css({
                    top: b.height + "px",
                    opacity: 0
                }), !1;
                b.seating <= 1 && $("#upImg").show()
            }
            if (d > 0 && b.seating > 0 ? (b.seatState && (e = b.seating, b.exPage ? e = b.exPage + 1 : b.sortS && (e = Number(b.sortS + 1)), b.seatState = !1, $(".layout").eq(e - 1).css({
                    "-webkit-transform": "translateY(" + b.height + "px)"
                }), $("#all-page").css({
                    opacity: 0
                }), $(".ele_background_" + Number(e - 1)).css({
                    "-webkit-transform": "translateY(" + b.height + "px)"
                }), setTimeout(function () {
                    $("#all-page").css({
                        opacity: 1
                    }), $("#all-page").empty().append(b.createPage(b.result.page)), b.lastAbout()
                }, 600)), navigator.userAgent.indexOf("Android") > -1 && b.seating - 2 == b.videoNext && document.getElementById("vid") && setTimeout(function () {
                    document.getElementById("vid").muted = "muted", document.getElementById("vid").play()
                }, 600), b.seating--, b.type ? ($(".layout").eq(b.seating + 1).css({
                    opacity: "0"
                }), $(".ele_background_" + Number(b.seating + 1)).css({
                    opacity: "0"
                }), setTimeout(function () {
                    $(".layout").eq(b.seating).removeClass("hide").css({
                        opacity: "1"
                    }), $(".layout").eq(b.seating + 1).addClass("hide").css({
                        opacity: "1"
                    })
                }, c)) : ($(".layout").eq(b.seating + 1).css({
                    "-webkit-transform": "translateY(" + b.height + "px)"
                }), $(".ele_background_" + Number(b.seating + 1)).css({
                    "-webkit-transform": "translateY(" + b.height + "px)"
                }), setTimeout(function () {
                    $(".layout").eq(b.seating).removeClass("hide").css({
                        "-webkit-transform": "scale(1) translateY(0)"
                    }), $(".layout").eq(b.seating + 1).addClass("hide").css({
                        "-webkit-transform": "translateY(0)"
                    })
                }, c))) : 0 > d && b.seating < b.result.page.length && b.seating != b.result.page.length - 1 && (b.seatState && (e = b.seating, b.exPage && (e = b.exPage + 1), b.seatState = !1, $(".layout").eq(e - 1).css({
                    "-webkit-transform": "translateY(-" + b.height + "px)"
                }), $("#all-page").css({
                    opacity: 0
                }), $(".ele_background_" + Number(e - 1)).css({
                    "-webkit-transform": "translateY(0px)"
                }), setTimeout(function () {
                    $("#all-page").css({
                        opacity: 1
                    }), $("#all-page").empty().append(b.createPage(b.result.page)), b.lastAbout()
                }, 600)), navigator.userAgent.indexOf("Android") > -1 && b.seating == b.videoNext && document.getElementById("vid") && setTimeout(function () {
                    document.getElementById("vid").muted = "muted", document.getElementById("vid").play()
                }, 600), b.seating++, b.type ? ($(".layout").eq(b.seating - 1).css({
                    opacity: "0"
                }), $(".ele_background_" + b.seating).css({
                    opacity: "1"
                }), setTimeout(function () {
                    $(".layout").eq(b.seating).removeClass("hide"), $(".layout").eq(b.seating - 1).addClass("hide")
                }, c)) : ($(".layout").eq(b.seating - 1).css({
                    "-webkit-transform": "scale(1) translateY(-" + 1.2 * b.height + "px)"
                }), $(".ele_background_" + b.seating).css({
                    "-webkit-transform": "translateY(0)"
                }), setTimeout(function () {
                    $(".layout").eq(b.seating).removeClass("hide").css({
                        "-webkit-transform": "translateY(0)"
                    }), $(".layout").eq(b.seating - 1).addClass("hide")
                }, c))), setTimeout(function () {
                    b.chatMsg()
                }, 600), b.editState && (b.type || b.getParams("edit")))
                for (f = $(".editIcon"), f.addClass("hide"), g = 0; g < f.length; g++) f.eq(g).attr("page_id") == b.result.page[b.seating].id && f.eq(g).removeClass("hide")
        })
    }, getParams = function (a) {
        function c() {
            var a, b, f, c = /\+/g,
                d = /([^&=]+)=?([^&]*)/g,
                e = function (a) {
                    return decodeURIComponent(a.replace(c, " "))
                };
            for (f = window.location.hash.substring() ? window.location.hash.substring().split("?")[1] : window.location.search.substring(1), a = {}; b = d.exec(f);) a[e(b[1])] = e(b[2]);
            return a
        }

        var b = c();
        return b[a]
    }, sendCash = function (a) {
        var b = this;
        console.log(a), $.ajax({
            url: b.localhost + a.api,
            type: "post",
            data: a.data,
            success: function (c) {
                0 == c.status.RetCode ? (sessionStorage.setItem("cash_id", ""), sessionStorage.setItem("gift_id", c.data["give_id"] || ""), b.wxPaySend(a, c.data.pay_params, "cash"), $(".loadmore-loading").remove()) : (b.msgMax("请在微信客户端进行支付操作", "确定"), $(".loadmore-loading").remove())
            }
        })
    }, sendGift = function (a) {
        var b = this;
        console.log(a), $.ajax({
            url: b.localhost + a.payApi,
            type: "post",
            data: a.payParams,
            success: function (c) {
                0 == c.status.RetCode ? (sessionStorage.setItem("cash_id", ""), sessionStorage.setItem("gift_id", c.data["give_id"] || ""), b.wxPaySend(a, c.data.pay_params, "payGift"), $(".loadmore-loading").remove()) : (b.msgMax("请在微信客户端进行支付操作", "确定"), $(".loadmore-loading").remove())
            }
        })
    }, wxPaySend = function (a, b, c) {
        var d = this;
        b && WeixinJSBridge.invoke("getBrandWCPayRequest", JSON.parse(b), function (e) {
            $(".msgMax_box") && $(".msgMax_box").remove(), "get_brand_wcpay_request:ok" == e.err_msg ? (window.location.href = "payGift" == c ? a.payCallBack + "?type=gift&payGift=" + a.payGift + "&payMoney=" + a.payMoney : a.callback + "?type=cash&payMoney=" + a.data.price, pay.writeCookie("cardPrice", !0), pay.writeCookie("cashGiftName", a.giver_name)) : "get_brand_wcpay_request:cancel" == e.err_msg ? msgWin.msgMax2BTN(["朕意已决", "立即支付"], function () {
                d.wxPaySend(a, b, c)
            }) : "get_brand_wcpay_request:fail" == e.err_msg && d.msgMax(e.err_code + e.err_desc + e.err_msg, "确定")
        })
    }, msgMax = function (a, b, c) {
        $("body").append('<div class="msgMax_box" style="position:fixed;top:0;left:0;bottom:0;right:0;background:rgba(0,0,0,0.6);z-index:999"></div><div class="msgMax_box" style="margin:auto;position:fixed;top:0;left:0;bottom:0;right:0;width:75%;height:' + .25 * $(window).height() + 'px;background:#fff;border-radius:8px;text-align:center;font-size:.7rem;z-index:9999"><p style="padding:0 18px;display:table-cell;vertical-align:middle;color:#666;width:' + .75 * $(window).width() + "px;height:" + .18 * $(window).height() + 'px;line-height:1rem;">' + a + '</p><div class="msgMax_btn" style="color:#ff705e;border-top:1px solid #e5e5e5;line-height:' + .07 * $(window).height() + 'px;">' + b + "</div></div>"), $(document).on("touchstart", ".msgMax_btn", function () {
            $(".msgMax_box").remove()
        }), c && c()
    }, msgMax2BTN = function (a, b) {
        $("body").append('<div class="msgMax_box" style="position:fixed;top:0;left:0;bottom:0;right:0;background:rgba(0,0,0,0.6);z-index:999"></div><div class="msgMax_box" style="margin:auto;position:fixed;top:0;left:0;bottom:0;right:0;width:75%;height:' + .3 * $(window).height() + 'px;background:#fff;border-radius:8px;text-align:center;font-size:.7rem;z-index:9999"><p style="padding:0 18px;display:table-cell;vertical-align:middle;color:#666;width:' + .75 * $(window).width() + "px;height:" + .23 * $(window).height() + 'px;line-height:1rem;">亲，您真的要放弃支付吗？<br>新人会难过的哟</p><div class="msgMax_btn" style="display:-webkit-box;color:#ff705e;border-top:1px solid #e5e5e5;line-height:' + .07 * $(window).height() + 'px;"><div class="cancelBtn" style="-webkit-box-flex:1;border-right:1px solid #e5e5e5;color:#ddd">' + a[0] + '</div><div class="payBtn" style="-webkit-box-flex:1;color:#1aad19">' + a[1] + "</div></div></div>"), $(document).on("touchstart", ".cancelBtn", function () {
            $(".msgMax_box").remove()
        }), $(document).on("touchstart", ".payBtn", function () {
            b && b()
        })
    }, isWeiXin = function () {
        var a = window.navigator.userAgent.toLowerCase();
        return "micromessenger" == a.match(/MicroMessenger/i) ? !0 : !1
    }, writeCookie = function (a, b, c) {
        var d = "";
        null != c && (d = new Date((new Date).getTime() + 36e5 * c), d = "; expires=" + d.toGMTString()), document.cookie = a + "=" + escape(b) + d + ";path=/"
    }, getCookie = function (a) {
        var b = document.cookie,
            c = b.indexOf("" + a + "=");
        return -1 == c && (c = b.indexOf(a + "=")), -1 == c ? b = null : (c = b.indexOf("=", c) + 1, cookieEndAt = b.indexOf(";", c), -1 == cookieEndAt && (cookieEndAt = b.length), b = unescape(b.substring(c, cookieEndAt))), b
    }, sdkData = function (a, b, c) {
        var d = this,
            e = '{"events":[' + JSON.stringify(a) + "]}",
            f = this.getParams("appName") || "";
        $.ajax({
            url: '/婚礼纪_files/batch.json',
            type: "post",
            data: e,
            headers: {
                appName: f
            },
            success: function () {
                b && b()
            },
            error: function () {
                c && c()
            }
        })
    }, rans = function (a) {
        var b, c, d;
        if (localStorage.getItem("rans")) return localStorage.getItem("rans");
        for (a = a || 32, b = "ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678", c = b.length, d = "", i = 0; a > i; i++) d += b.charAt(Math.floor(Math.random() * c));
        return localStorage.setItem("rans", d), d
    }, sdk = function () {
        var a = this,
            b = a.result.cardInfo.card_saas_info;
        $.ajax({
            url: "https://www.hunliji.com/sms/ip",
            type: "get",
            success: function (b) {
                a.ip = b, localStorage.setItem("ip", b)
            }
        }), setTimeout(function () {
            a.sdkData({
                action: "view",
                eventable_type: "Card",
                additional: {
                    ip: a.ip,
                    card_id: a.card_id,
                    num: a.rans(32),
                    tag: b ? "saas" : ""
                }
            })
        }, 3e3)
    }, {
        wxPaySend: wxPaySend,
        msgMax: msgMax,
        msgMax2BTN: msgMax2BTN,
        isWeiXin: isWeiXin,
        wxsq: wxsq,
        wxsq_event: wxsq_event,
        otherAction: otherAction,
        guestPageHide: guestPageHide,
        ajax_reply: ajax_reply,
        ajax_info: ajax_info,
        ajax_gifts: ajax_gifts,
        closeCardState: closeCardState,
        init: init,
        hideEdit: hideEdit,
        get_infinite: get_infinite,
        selectGift: selectGift,
        getGifts_replies: getGifts_replies,
        chatMsg: chatMsg,
        gift_action: gift_action,
        winMsg: winMsg,
        outputMsg: outputMsg,
        loadAnimate: loadAnimate,
        allImg: allImg,
        loading: loading,
        add_infinite: add_infinite,
        rov_infinite: rov_infinite,
        otherMap: otherMap,
        addStyle: addStyle,
        createPage: createPage,
        guestsPage: guestsPage,
        guestAction: guestAction,
        musicPause: musicPause,
        changeVideo: changeVideo,
        changeMusic: changeMusic,
        musicStatePause: musicStatePause,
        exchangePage: exchangePage,
        addPage: addPage,
        editPageHoles: editPageHoles,
        delPage: delPage,
        getCurrentPage: getCurrentPage,
        gotoPage: gotoPage,
        autoPlayPage: autoPlayPage,
        positionIcon: positionIcon,
        lastAbout: lastAbout,
        giftPage: giftPage,
        selectGift_v2: selectGift_v2,
        gift_action_v2: gift_action_v2,
        upDownIcon: upDownIcon,
        iosReg: iosReg,
        touchAction: touchAction,
        editCard_app: editCard_app,
        editIconState: editIconState,
        getParams: getParams,
        sendGift: sendGift,
        sendCash: sendCash,
        writeCookie: writeCookie,
        getCookie: getCookie,
        rans: rans,
        sdkData: sdkData,
        sdk: sdk,
        getSaasMerchantInfo: getSaasMerchantInfo,
        createRedPackets: createRedPackets,
        giftsMarquee: giftsMarquee,
        isIphoneX: isIphoneX
    }
}();
var INVITATION_CARD = new boot;
INVITATION_CARD.isWeiXin() && "/p/wedding/Home/Pay/card_page" != location.pathname && (location.href = "/p/wedding/Home/Pay/card_page" + location.search), INVITATION_CARD.ajax_info();