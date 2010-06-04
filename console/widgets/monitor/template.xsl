<?xml version="1.0" encoding="UTF-8"?>
  <xsl:stylesheet 
   version="1.0"
   xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
   xmlns="http://www.w3.org/1999/xhtml">
  <xsl:output method="xml" indent="yes"/> 
 
  <xsl:template match='/'>

    <div class='RecordList'>
      <xsl:for-each select="monitor/record">
      <xsl:if test="cmd">
        <div class="Command">
          <label class="Arrow">&gt; </label>
          <xsl:value-of select="cmd" />
        </div>
      </xsl:if>
      <div>
        <xsl:attribute name='class'>
          Record <xsl:value-of select='class' />
        </xsl:attribute>
        <xsl:value-of select='message' />
      </div>
      </xsl:for-each>
    </div>
    
  </xsl:template>

</xsl:stylesheet>
