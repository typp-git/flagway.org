// components/markdownUtils.ts
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkStringify from "remark-stringify";
import { remarkToSlate, slateToRemark } from "@udecode/plate-serializer";

export async function mdToSlate(md: string) {
  const tree = unified().use(remarkParse).parse(md);
  return remarkToSlate()(tree);
}

export async function slateToMd(slateValue: any[]) {
  const tree = slateToRemark()(slateValue);
  return unified().use(remarkStringify).stringify(tree);
}
