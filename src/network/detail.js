import {request} from "@/network/request";

export function getDetailViewData() {
  return request({
    url: 'demo.json'
  })
}