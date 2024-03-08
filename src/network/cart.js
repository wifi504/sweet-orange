import {request} from "@/network/request";

export function getCartViewData() {
  return request({
    url: 'demo.json'
  })
}